"""
Enforcement logic for the dreamer-first-delivery-then-consent rule.

This is deliberately NOT just a UI convention. Per architecture doc Section
6.1: a Product can only be created from a Dream that has reached
DELIVERED_TO_DREAMER or later, and consent_to_publish can only become True
through request_consent()/grant_consent() below — never through a generic
serializer update. Every entry point (admin action, future endpoints) must
call these functions rather than setting the fields directly.
"""
from django.utils import timezone
from django.core.exceptions import ValidationError
from .models import Dream, DreamStatus


def _notify(dream: Dream, body: str) -> None:
    """Fire a dream_status notification, fail silently so a notification bug never breaks the main flow."""
    try:
        from apps.notifications.models import NotificationType
        from apps.notifications.services import send_notification
        send_notification(dream.user, NotificationType.DREAM_STATUS, body)
    except Exception:
        pass


def request_consent(dream: Dream) -> Dream:
    if dream.status not in (DreamStatus.DELIVERED_TO_DREAMER, DreamStatus.LIVE):
        raise ValidationError(
            "Consent can only be requested once the piece has been delivered to the dreamer."
        )
    dream.consent_requested_at = timezone.now()
    dream.save(update_fields=["consent_requested_at"])
    _notify(dream, "Your piece is ready — we'd love to share it with others. You decide.")
    return dream


def grant_consent(dream: Dream) -> Dream:
    if dream.status != DreamStatus.DELIVERED_TO_DREAMER:
        raise ValidationError("Consent can only be granted while status is Delivered to dreamer.")
    dream.consent_to_publish = True
    dream.consent_granted_at = timezone.now()
    dream.status = DreamStatus.LIVE
    dream.save(update_fields=["consent_to_publish", "consent_granted_at", "status"])
    _notify(dream, "Your dream is now live — others can find and wear what you imagined.")
    return dream


def decline_consent(dream: Dream) -> Dream:
    if dream.status != DreamStatus.DELIVERED_TO_DREAMER:
        raise ValidationError("Consent can only be declined while status is Delivered to dreamer.")
    dream.consent_to_publish = False
    dream.status = DreamStatus.DECLINED_PAUSED
    dream.save(update_fields=["consent_to_publish", "status"])
    return dream


def can_become_product(dream: Dream) -> bool:
    """
    The single gate every product-creation path must check. See catalog
    app's publish action — it imports and calls this rather than
    re-implementing the check.
    """
    return dream.status == DreamStatus.LIVE and dream.consent_to_publish
