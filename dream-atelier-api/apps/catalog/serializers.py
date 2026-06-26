from rest_framework import serializers
from .models import Product, Banner


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ["id", "image_url", "headline", "deep_link"]


class ProductListSerializer(serializers.ModelSerializer):
    """PRD Section 7.1: minimal card — photo, shop-this-look, love/save counts."""

    display_photo_url = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            "id", "title", "category", "mood_tags", "price_inr",
            "display_photo_url", "save_count", "love_count", "published_at",
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    display_photo_url = serializers.ReadOnlyField()
    dreamer_words = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id", "title", "description", "category", "mood_tags", "price_inr",
            "display_photo_url", "save_count", "love_count", "share_count",
            "delivery_count", "published_at", "dreamer_words",
        ]

    def get_dreamer_words(self, obj):
        """PRD Module 3, Part 2: 'her original words below the card, exactly as she wrote them'."""
        if obj.origin_dream_id and obj.origin_dream.consent_to_publish:
            return obj.origin_dream.free_text
        return None
