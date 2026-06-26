from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ["user", "type", "body_preview", "read", "created_at"]
    list_filter = ["type", "read", "created_at"]
    search_fields = ["user__phone", "body"]
    readonly_fields = ["user", "type", "body", "read", "created_at"]

    def body_preview(self, obj):
        return obj.body[:60] + "..." if len(obj.body) > 60 else obj.body
    body_preview.short_description = "Body"
