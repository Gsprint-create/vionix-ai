import json
import time
from app import create_app
from app.extensions import db
from app.models import Job
from app.services.executors import run_genix, run_faceswap

POLL_INTERVAL = 0.5  # seconds

def _loads(s):
    try:
        return json.loads(s or "{}")
    except Exception:
        return {}

def _dumps(obj):
    return json.dumps(obj or {}, ensure_ascii=False)

def claim_next_job():
    # Dev-simple claiming. For Postgres later, we can do SKIP LOCKED.
    job = Job.query.filter_by(status="queued").order_by(Job.created_at.asc()).first()
    if not job:
        return None
    job.status = "running"
    job.progress = 1
    db.session.commit()
    return job

def set_progress(job_id, pct: int):
    job = Job.query.get(job_id)
    if not job:
        return
    job.progress = max(0, min(int(pct), 100))
    db.session.commit()

def succeed(job_id, result: dict):
    job = Job.query.get(job_id)
    if not job:
        return
    job.status = "succeeded"
    job.progress = 100
    job.result_json = _dumps(result)
    job.error = None
    db.session.commit()

def fail(job_id, err: str):
    job = Job.query.get(job_id)
    if not job:
        return
    job.status = "failed"
    job.progress = 100
    job.error = err
    db.session.commit()

def process_job(job: Job):
    payload = _loads(job.payload_json)

    def prog(p): set_progress(job.id, p)

    if job.type == "genix.generate":
        result = run_genix(payload, prog)
        succeed(job.id, result)
        return

    if job.type == "faceswap.swap":
        result = run_faceswap(payload, prog)
        succeed(job.id, result)
        return

    fail(job.id, f"unknown_job_type:{job.type}")

def main():
    app = create_app()
    print("Vionix Worker started. Polling for jobs...")

    with app.app_context():
        while True:
            try:
                job = claim_next_job()
                if not job:
                    time.sleep(POLL_INTERVAL)
                    continue

                print(f"Processing job {job.id} ({job.type})")
                process_job(job)

            except KeyboardInterrupt:
                print("Worker stopped.")
                break
            except Exception as e:
                # If something crashes mid-loop, wait and continue
                print("Worker error:", e)
                time.sleep(1.0)

if __name__ == "__main__":
    main()
