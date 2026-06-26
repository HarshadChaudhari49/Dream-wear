from rest_framework import serializers
from apps.catalog.serializers import ProductListSerializer
from .models import Order, OrderItem, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity"]

    def to_representation(self, instance):
        """Return nested product object on read; write still accepts product PK."""
        rep = super().to_representation(instance)
        rep["product"] = ProductListSerializer(instance.product).data
        return rep


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "price_at_purchase_inr"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "status", "carrier", "tracking_ref", "total_inr", "items", "created_at"]
        read_only_fields = fields


class OrderTrackingSerializer(serializers.ModelSerializer):
    """
    PRD Section 11.3: tracking does exactly two jobs — reassure, build
    anticipation. This serializer intentionally does NOT expose raw carrier
    status strings; frontend should render `status` through the calm-tone
    copy map documented in the architecture doc Section 8.2, not display it
    verbatim.
    """

    class Meta:
        model = Order
        fields = ["id", "status", "carrier", "tracking_ref"]
