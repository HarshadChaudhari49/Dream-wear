from rest_framework import generics, permissions
from apps.orders.models import OrderItem
from .models import SavedItem
from .serializers import SavedItemSerializer, WardrobeItemSerializer


class WishlistView(generics.ListCreateAPIView):
    """PRD Module 5: 'Things you're dreaming about.'"""

    serializer_class = SavedItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WardrobeView(generics.ListAPIView):
    """PRD Module 5: 'My Wardrobe (Previously Bought)' with dream-origin callbacks."""

    serializer_class = WardrobeItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            OrderItem.objects.filter(order__user=self.request.user)
            .select_related("product", "product__origin_dream")
        )
