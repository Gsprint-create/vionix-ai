from typing import Optional
from werkzeug.security import generate_password_hash, check_password_hash

from ..extensions import db
from ..models import User

def create_user(email: str, password: str) -> User:
    email = (email or "").strip().lower()
    if not email:
        raise ValueError("email_required")
    if not password or len(password) < 6:
        raise ValueError("password_too_short")

    if User.query.filter_by(email=email).first():
        raise ValueError("email_exists")

    user = User(email=email, password_hash=generate_password_hash(password))
    db.session.add(user)
    db.session.commit()
    return user

def authenticate(email: str, password: str) -> Optional[User]:
    email = (email or "").strip().lower()
    user = User.query.filter_by(email=email).first()
    if not user:
        return None
    if not check_password_hash(user.password_hash, password or ""):
        return None
    return user

def get_user(user_id: str) -> Optional[dict]:
    u = User.query.get(user_id)
    if not u:
        return None
    return {"id": u.id, "email": u.email}
