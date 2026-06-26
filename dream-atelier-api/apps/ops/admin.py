"""
Custom admin actions that span multiple apps live here, not in dreams/admin.py
or catalog/admin.py, so neither of those apps needs to import the other.

These are registered onto Dream's existing admin via Django's admin action
mechanism rather than subclassing DreamAdmin, to avoid a circular import
between dreams and catalog.
"""
from django.contrib import admin
from django.core.exceptions import ValidationError
from apps.dreams.models import Dream
from apps.dreams.admin import DreamAdmin
from apps.catalog import services as catalog_services


@admin.action(description="Publish product from this dream (requires consent granted)")
def publish_product_from_dream_action(modeladmin, request, queryset):
    for dream in queryset:
        try:
            catalog_services.publish_product_from_dream(
                dream,
                title=f"Untitled — from dream {dream.id}",
                category="kurti",
                price_inr=0,
            )
            modeladmin.message_user(request, f"Published product from dream {dream.id}. Edit it to set title/price/photos.")
        except ValidationError as exc:
            modeladmin.message_user(request, f"Could not publish dream {dream.id}: {exc}", level="error")


# Attach the cross-app action to the existing DreamAdmin without re-registering it.
DreamAdmin.actions = list(DreamAdmin.actions) + ["publish_product_from_dream_action"]
DreamAdmin.publish_product_from_dream_action = publish_product_from_dream_action
