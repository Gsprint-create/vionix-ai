import json
import time
import threading
from typing import Any, Dict, Optional, List

from ..extensions import db
from ..models import Job

# --- helpers ---
def _to_payload(obj: Dict[str, Any]) -> str:
    return json.dumps(obj or {}, ensure_ascii=False)

def _from_payload(s: Optional[str]) -> Dict[str, Any]:
    try:
        return json.loads(s or "{}")
    except Exception:
        return {}

def create_job(job_type: str, payload: Dict[str, Any]) -> Job:
    job = Job(
        type=job_type,
        status="queued",
        progress=0,
        payload_json=_to_payload(payload),
        result_json=None,
        error=None,
    )
    db.session.add(job)
    db.session.commit()
    return job

def get_job(job_id: str) -> Optional[Job]:
    return Job.query.get(job_id)

def list_jobs(limit: int = 20) -> List[Job]:
    limit = max(1, min(int(limit), 100))
    return Job.query.order_by(Job.created_at.desc()).limit(limit).all()

def to_dict(job: Job) -> Dict[str, Any]:
    return {
        "id": job.id,
        "type": job.type,
        "status": job.status,
        "progress": job.progress,
        "payload": _from_payload(job.payload_json),
        "result": _from_payload(job.result_json) if job.result_json else None,
        "error": job.error,
        "created_at": job.created_at.timestamp() if job.created_at else None,
        "updated_at": job.updated_at.timestamp() if job.updated_at else None,
    }

def _set_job(job: Job, **updates) -> None:
    for k, v in updates.items():
        setattr(job, k, v)
    db.session.commit()

def simulate_job(app, job_id: str, seconds: float = 2.5) -> None:
    # This runs in a thread; we need an app context to use the DB safely.
    with app.app_context():
        job = get_job(job_id)
        if not job:
            return

        try:
            _set_job(job, status="running", progress=5)

            steps = 10
            for i in range(1, steps + 1):
                time.sleep(seconds / steps)
                pct = 5 + int((i / steps) * 90)
                job = get_job(job_id)
                if not job:
                    return
                _set_job(job, progress=pct)

            job = get_job(job_id)
            if not job:
                return

            payload = _from_payload(job.payload_json)

            if job.type == "genix.generate":
                prompt = payload.get("prompt", "")
                _set_job(
                    job,
                    status="succeeded",
                    progress=100,
                    result_json=_to_payload({
                        "message": "Mock image generated (no model wired yet).",
                        "prompt": prompt,
                        "image_url": "/static/mock/genix_sample.png",
                    }),
                )
            elif job.type == "faceswap.swap":
                _set_job(
                    job,
                    status="succeeded",
                    progress=100,
                    result_json=_to_payload({
                        "message": "Mock face swap complete (no pipeline wired yet).",
                        "output_url": "/static/mock/faceswap_sample.png",
                    }),
                )
            else:
                _set_job(
                    job,
                    status="succeeded",
                    progress=100,
                    result_json=_to_payload({"message": "Mock job complete."}),
                )

        except Exception as e:
            job = get_job(job_id)
            if job:
                _set_job(job, status="failed", progress=100, error=str(e))

def start_simulation(app, job_id: str, seconds: float = 2.5) -> None:
    t = threading.Thread(target=simulate_job, args=(app, job_id, seconds), daemon=True)
    t.start()
