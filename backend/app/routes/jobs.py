from flask import Blueprint, jsonify, request
from ..services.jobs import get_job, list_jobs, to_dict

jobs_bp = Blueprint("jobs", __name__)


@jobs_bp.route("/api/jobs/<job_id>", methods=["GET"])
def job_detail(job_id):
    job = get_job(job_id)
    if not job:
        return jsonify({"ok": False, "error": "job_not_found", "job_id": job_id}), 404
    return jsonify({"ok": True, "job": to_dict(job)})


@jobs_bp.route("/api/jobs", methods=["GET"])
def jobs_list():
    limit = request.args.get("limit", default=20, type=int)
    jobs = [to_dict(j) for j in list_jobs(limit=limit)]
    return jsonify({"ok": True, "count": len(jobs), "jobs": jobs})
