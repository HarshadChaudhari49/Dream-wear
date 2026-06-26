from django.contrib import admin
from .models import Dream, DreamStage, DreamInspirationImage, DesignerTailor


class DreamStageInline(admin.TabularInline):
    model = DreamStage
    extra = 1


class DreamInspirationImageInline(admin.TabularInline):
    model = DreamInspirationImage
    extra = 0


@admin.register(Dream)
class DreamAdmin(admin.ModelAdmin):
    """
    This is the dream queue referenced in the architecture doc Section 3.2 —
    triage, assign, and track dreams here until a dedicated ops UI exists.
    """

    list_display = ["id", "user", "status", "assigned_designer", "consent_to_publish", "created_at"]
    list_filter = ["status", "occasion_tag", "consent_to_publish"]
    search_fields = ["free_text", "user__phone", "user__name"]
    inlines = [DreamInspirationImageInline, DreamStageInline]
    readonly_fields = ["consent_requested_at", "consent_granted_at"]

    actions = ["mark_in_review", "mark_in_progress", "mark_delivered_to_dreamer"]

    @admin.action(description="Mark selected dreams as In review")
    def mark_in_review(self, request, queryset):
        queryset.update(status="in_review")

    @admin.action(description="Mark selected dreams as In progress")
    def mark_in_progress(self, request, queryset):
        queryset.update(status="in_progress")

    @admin.action(description="Mark selected dreams as Delivered to dreamer")
    def mark_delivered_to_dreamer(self, request, queryset):
        queryset.update(status="delivered_to_dreamer")


@admin.register(DesignerTailor)
class DesignerTailorAdmin(admin.ModelAdmin):
    list_display = ["name", "specialty", "active"]
