from datetime import datetime
from ..extensions import db

class Waitlist(db.Model):
    __tablename__ = "waitlist"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(320), nullable=False, index=True)
    tool = db.Column(db.String(64), nullable=False, index=True)  # "genix" | "influencer"
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    __table_args__ = (
        db.UniqueConstraint("email", "tool", name="uq_waitlist_email_tool"),
    )
