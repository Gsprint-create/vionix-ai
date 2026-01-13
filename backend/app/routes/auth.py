from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from ..services.users import create_user, authenticate, get_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}
    try:
        user = create_user(data.get("email"), data.get("password"))
    except ValueError as e:
        return jsonify({"ok": False, "error": str(e)}), 400

    token = create_access_token(identity=user.id)
    return jsonify({"ok": True, "access_token": token, "user": {"id": user.id, "email": user.email}}), 201


@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    user = authenticate(data.get("email"), data.get("password"))
    if not user:
        return jsonify({"ok": False, "error": "invalid_credentials"}), 401

    token = create_access_token(identity=user.id)
    return jsonify({"ok": True, "access_token": token, "user": {"id": user.id, "email": user.email}})


@auth_bp.route("/api/auth/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = get_user(user_id)
    if not user:
        return jsonify({"ok": False, "error": "user_not_found"}), 404
    return jsonify({"ok": True, "user": user})
