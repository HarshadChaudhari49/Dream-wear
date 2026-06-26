from rest_framework import serializers
from apps.catalog.serializers import ProductListSerializer
from .models import SavedItem


class SavedItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)

    class Meta:
        model = SavedItem
        fields = ["id", "product", "created_at"]


class WardrobeItemSerializer(serializers.Serializer):
    """
    PRD Module 5: 'Previously Bought' with the dream-origin callback —
    'This started as your wish for something soft for work.' Built from
    OrderItem + Product + origin Dream, not its own model.
    """

    product = ProductListSerializer()
    dream_origin_text = serializers.SerializerMethodField()

    def get_dream_origin_text(self, obj):
        product = obj.product
        try:
            dream = product.origin_dream
        except Exception:
            return None
        if dream:
            return f"This started as your wish: “{dream.free_text[:80]}…”"
        return None
