"""
Calm-tone enforcement for notification copy, per PRD Section 11.1 and
architecture doc Section 8.2: 'gentle, non-pushy nudges... never aggressive
BUY NOW urgency.'

This is a best-effort lint, not a guarantee — final copy review by a human
is still required. It exists to catch the most obvious violations before
they ship.
"""
import re
from .models import Notification, NotificationType

BANNED_PATTERNS = [
    r"\bbuy now\b",
    r"\bact now\b",
    r"\bhurry\b",
    r"\blimited time\b",
    r"\bonly \d+ left\b",
    r"!{2,}",  # multiple exclamation marks read as shouting
]


def violates_calm_tone(body: str) -> bool:
    lowered = body.lower()
    return any(re.search(pattern, lowered) for pattern in BANNED_PATTERNS)


def send_notification(user, notif_type: NotificationType, body: str) -> Notification:
    if violates_calm_tone(body):
        raise ValueError(
            f"Notification copy violates the calm-tone rule (PRD Section 11.1): {body!r}"
        )
    return Notification.objects.create(user=user, type=notif_type, body=body)
