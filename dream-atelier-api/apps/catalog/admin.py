from django.contrib import admin
from .models import Product, Banner


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "price_inr", "is_publishable", "published_at", "save_count", "love_count"]
    list_filter = ["category", "is_publishable"]
    search_fields = ["title", "description"]
    readonly_fields = ["published_at"]


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ["headline", "active", "sort_order"]
    list_editable = ["sort_order", "active"]
