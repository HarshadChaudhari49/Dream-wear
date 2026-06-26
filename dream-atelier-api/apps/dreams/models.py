import uuid
from django.conf import settings
from django.db import models
from apps.core.models import AbstractBaseModel


class MoodTag(models.TextChoices):
    """PRD Module 3, Part 1: 'quick-select chips' — optional at submission."""
    SOFT = "soft", "Soft"
    BOLD = "bold", "Bold"
    CLASSIC = "classic", "Classic"
    EDGY = "edgy", "Edgy"
    ROMANTIC = "romantic", "Romantic"
    MINIMAL = "minimal", "Minimal"


class OccasionTag(models.TextChoices):
    """PRD Module 3, Part 1: occasion tags."""
    EVERYDAY = "everyday", "Everyday"
    CELEBRATION = "celebration", "Celebration"
    TRAVEL = "travel", "Travel"
    JUST_FOR_ME = "just_for_me", "Just for me"


class DreamStatus(models.TextChoices):
    """
    Canonical status taxonomy — must match the workflow diagram in the
    architecture doc (Section 6) exactly. If you add a status here, update
    that diagram too.
    """
    SUBMITTED = "submitted", "Submitted"
    IN_REVIEW = "in_review", "In review"
    IN_PROGRESS = "in_progress", "In progress"
    DELIVERED_TO_DREAMER = "delivered_to_dreamer", "Delivered to dreamer"
    LIVE = "live", "Live"
    DECLINED_PAUSED = "declined_paused", "Declined / paused"


class DesignerTailor(models.Model):
    """
    Deliberately minimal — per founder confirmation, designers/tailors are
    real people working from manually-routed briefs at launch. This is not
    a full vendor-management system, just enough to assign and track.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=120)
    specialty = models.CharField(max_length=120, blank=True)
    contact_info = models.CharField(max_length=200, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Dream(AbstractBaseModel):
    """
    The unit of input to the core loop (PRD Section 1.1). One Dream may
    become at most one Product (see catalog.Product.origin_dream).
    """

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="dreams")
    free_text = models.TextField(help_text="Her open description — 'no detail is too small'.")
    mood_tags = models.JSONField(default=list, blank=True, help_text="List of MoodTag values, optional.")
    occasion_tag = models.CharField(max_length=20, choices=OccasionTag.choices, blank=True)
    feeling_prompt = models.CharField(
        max_length=300, blank=True,
        help_text="Answer to 'What feeling do you want this outfit to give you?'",
    )

    status = models.CharField(max_length=24, choices=DreamStatus.choices, default=DreamStatus.SUBMITTED)
    assigned_designer = models.ForeignKey(
        DesignerTailor, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_dreams",
    )

    consent_to_publish = models.BooleanField(
        default=False,
        help_text="Defaults False. Only set True via the dedicated consent endpoint — never via generic PATCH.",
    )
    consent_requested_at = models.DateTimeField(null=True, blank=True)
    consent_granted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Dream({self.id}) — {self.user} — {self.status}"


class DreamInspirationImage(AbstractBaseModel):
    """PRD Module 3, Part 1: 'Inspiration upload' — multi-image, optional."""

    dream = models.ForeignKey(Dream, on_delete=models.CASCADE, related_name="inspiration_images")
    image_url = models.URLField()


class DreamStage(AbstractBaseModel):
    """
    Stage-by-stage production tracking for PRD Module 4's stage tracker.
    A separate table (not a JSON blob) so the admin can add a stage with an
    ordinary form and so stages are independently queryable/orderable.
    """

    dream = models.ForeignKey(Dream, on_delete=models.CASCADE, related_name="stages")
    stage_name = models.CharField(
        max_length=80,
        help_text="e.g. Brief received, Fabric/pattern selected, In production, Quality check, Shipped. "
                   "Confirm actual taxonomy against real ops — see PRD Open Decision #5.",
    )
    photo_url = models.URLField(blank=True)
    notes = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ["created_at"]
