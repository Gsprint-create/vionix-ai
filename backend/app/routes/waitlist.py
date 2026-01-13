from flask import Blueprint, request, jsonify, current_app
from sqlalchemy.exc import IntegrityError
from ..extensions import db
from ..models.waitlist import Waitlist

waitlist_bp = Blueprint("waitlist", __name__, url_prefix="/api/waitlist")

ALLOWED_TOOLS = {"genix", "influencer"}

@waitlist_bp.post("")
def join_waitlist():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    tool = (data.get("tool") or "").strip().lower()
    hp = (data.get("company") or "").strip()  # honeypot: should be empty

    if hp:
        return jsonify({"ok": True, "message": "ok"}), 200

    if "@" not in email or "." not in email:
        return jsonify({"ok": False, "error": "invalid_email"}), 400

    if tool not in ALLOWED_TOOLS:
        return jsonify({"ok": False, "error": "invalid_tool"}), 400

    row = Waitlist(email=email, tool=tool)
    db.session.add(row)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"ok": True, "message": "already_joined"}), 200

    return jsonify({"ok": True, "message": "joined"}), 201
