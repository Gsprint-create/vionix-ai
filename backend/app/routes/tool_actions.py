from flask import Blueprint, jsonify, request
from flask_jwt_extended import verify_jwt_in_request
from ..services.tool_registry import get_tool
from ..services.jobs import create_job

tool_actions_bp = Blueprint("tool_actions", __name__)

@tool_actions_bp.before_request
def enforce_tool_auth_from_registry():
    path = request.path
    parts = path.strip("/").split("/")
    if len(parts) < 3 or parts[0] != "api" or parts[1] != "tools":
        return None

    tool_id = parts[2]
    tool = get_tool(tool_id)
    if tool and tool.get("requires_auth"):
        verify_jwt_in_request()
    return None


@tool_actions_bp.route("/api/tools/genix/generate", methods=["POST"])
def genix_generate():
    data = request.get_json(silent=True) or {}
    payload = {
        "prompt": data.get("prompt", ""),
        "seed": data.get("seed"),
        "aspect_ratio": data.get("aspect_ratio", "1:1"),
        "steps": data.get("steps", 25),
    }

    job = create_job("genix.generate", payload)
    return jsonify({"ok": True, "job_id": job.id, "status_url": f"/api/jobs/{job.id}"}), 202


@tool_actions_bp.route("/api/tools/faceswap/swap", methods=["POST"])
def faceswap_swap():
    data = request.get_json(silent=True) or {}
    payload = {
        "source_image": data.get("source_image"),
        "target_image": data.get("target_image"),
        "options": data.get("options", {}),
    }

    job = create_job("faceswap.swap", payload)
    return jsonify({"ok": True, "job_id": job.id, "status_url": f"/api/jobs/{job.id}"}), 202
