import uuid
from datetime import datetime, timezone
from .extensions import db

def _uuid():
    return uuid.uuid4().hex

def _now():
    return datetime.now(timezone.utc)

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.String(32), primary_key=True, default=_uuid)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), default=_now, nullable=False)

class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(db.String(32), primary_key=True, default=_uuid)
    type = db.Column(db.String(64), nullable=False, index=True)
    status = db.Column(db.String(16), nullable=False, index=True)  # queued/running/succeeded/failed
    progress = db.Column(db.Integer, nullable=False, default=0)

    payload_json = db.Column(db.Text, nullable=False, default="{}")
    result_json = db.Column(db.Text, nullable=True)
    error = db.Column(db.Text, nullable=True)

    created_at = db.Column(db.DateTime(timezone=True), default=_now, nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=_now, nullable=False, onupdate=_now)
