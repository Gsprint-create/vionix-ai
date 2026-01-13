from flask import Flask
from .config import Config
from .extensions import jwt, db
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    origins = [o.strip() for o in app.config.get("CORS_ORIGINS", "").split(",") if o.strip()]
    if origins:
        CORS(app, resources={r"/api/*": {"origins": origins}})
    else:
        # safe default for local dev
        CORS(app, resources={r"/api/*": {"origins": "*"}})

    jwt.init_app(app)
    db.init_app(app)

    # import models so SQLAlchemy knows them
    from . import models  # noqa: F401

    with app.app_context():
        db.create_all()

    from .routes.health import health_bp
    app.register_blueprint(health_bp)

    from .routes.tools import tools_bp
    app.register_blueprint(tools_bp)

    from .routes.jobs import jobs_bp
    app.register_blueprint(jobs_bp)

    from .routes.tool_actions import tool_actions_bp
    app.register_blueprint(tool_actions_bp)

    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    return app

