from flask import Blueprint, jsonify, request

from ..services.tool_registry import list_tools, get_tool

tools_bp = Blueprint("tools", __name__)


@tools_bp.route("/api/tools", methods=["GET"])
def tools_list():
    category = request.args.get("category")  # optional filter
    status = request.args.get("status")      # optional filter

    return jsonify({
        "ok": True,
        "count": len(list_tools(category=category, status=status)),
        "tools": list_tools(category=category, status=status),
    })


@tools_bp.route("/api/tools/<tool_id>", methods=["GET"])
def tools_detail(tool_id):
    tool = get_tool(tool_id)
    if not tool:
        return jsonify({"ok": False, "error": "tool_not_found", "tool_id": tool_id}), 404

    return jsonify({"ok": True, "tool": tool})
