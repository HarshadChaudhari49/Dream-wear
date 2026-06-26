from django.conf import settings
from django.db import models
from apps.core.models import AbstractBaseModel


class NotificationType(models.TextChoices):
    """PRD Section 11.1 — the notification categories the product needs."""
    DREAM_STATUS = "dream_status", "Dream status update"
    NEW_ARRIVAL = "new_arrival", "New arrival matching saved moods"
    WISHLIST_REMINDER = "wishlist_reminder", "Wishlist reminder"
    SHIPPING_UPDATE = "shipping_update", "Shipping update"
    SOCIAL_PROOF = "social_proof", "Social proof (X women loved your idea)"


class Notification(AbstractBaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications")
    type = models.CharField(max_length=24, choices=NotificationType.choices)
    body = models.CharField(
        max_length=200,
        help_text="Must pass the calm-tone check in services.py before saving — see architecture doc Section 8.2.",
    )
    read = models.BooleanField(default=False)
