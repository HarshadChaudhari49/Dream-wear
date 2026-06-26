from django.conf import settings
from django.db import models
from apps.core.models import AbstractBaseModel
from apps.catalog.models import Product


class SavedItem(AbstractBaseModel):
    """PRD Module 5: 'Saved & Wishlist' — framed in copy as 'Things you're dreaming about.'"""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="saved_items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="saved_by")

    class Meta:
        unique_together = ["user", "product"]


class StylingNote(models.Model):
    """
    PRD Module 5: 'Pairs beautifully with...' — manually curated at launch
    per architecture doc Section 10.5 (M5-10), automated styling is a
    future-version upgrade.
    """

    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name="styling_note")
    note = models.CharField(max_length=300)
