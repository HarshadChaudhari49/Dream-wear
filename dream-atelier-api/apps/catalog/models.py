from django.db import models
from apps.core.models import AbstractBaseModel
from apps.dreams.models import Dream, MoodTag


class ProductCategory(models.TextChoices):
    """PRD Module 1: 'starting with kurti's and tops... expanding to dresses and cord sets'."""
    KURTI = "kurti", "Kurti"
    TOP = "top", "Top"
    DRESS = "dress", "Dress"
    CO_ORD_SET = "co_ord_set", "Co-ord set"


class Product(AbstractBaseModel):
    """
    PRD Modules 1 & 2. origin_dream is nullable to support PRD Open Decision
    #9 (seed catalog) — a Product doesn't strictly need a Dream behind it,
    even though the brand's default path is dream-to-product.
    """

    origin_dream = models.OneToOneField(
        Dream, on_delete=models.SET_NULL, null=True, blank=True, related_name="product",
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=ProductCategory.choices)
    mood_tags = models.JSONField(default=list, blank=True, help_text="List of MoodTag values for filtering.")
    price_inr = models.DecimalField(max_digits=10, decimal_places=2)

    customer_photo_url = models.URLField(
        blank=True, help_text="Preferred — real customer wearing the piece, per brand authenticity rule.",
    )
    model_photo_url = models.URLField(blank=True, help_text="Fallback only, per PRD Section 7.1.")

    published_at = models.DateTimeField(null=True, blank=True)
    is_publishable = models.BooleanField(
        default=False,
        help_text="Gate enforced in services.py — see dreamer-first-delivery rule.",
    )

    delivery_count = models.PositiveIntegerField(default=0)
    save_count = models.PositiveIntegerField(default=0)
    love_count = models.PositiveIntegerField(default=0)
    share_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    @property
    def display_photo_url(self):
        return self.customer_photo_url or self.model_photo_url


class Banner(AbstractBaseModel):
    """PRD Module 1: 'Offer Banner — admin-configurable, deep-linkable'."""

    image_url = models.URLField()
    headline = models.CharField(max_length=140, blank=True)
    deep_link = models.CharField(max_length=200, blank=True)
    active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "-created_at"]
