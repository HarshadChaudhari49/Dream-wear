import django_filters
from django.db.models import F
from rest_framework import generics, permissions, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Banner
from .serializers import ProductListSerializer, ProductDetailSerializer, BannerSerializer


class BannerListView(generics.ListAPIView):
    """PRD Module 1.1.1: Home offer banner."""

    serializer_class = BannerSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Banner.objects.filter(active=True)


class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter()
    mood = django_filters.CharFilter(method="filter_mood")

    def filter_mood(self, queryset, name, value):
        # mood_tags is a JSONField list; __contains checks membership
        return queryset.filter(mood_tags__contains=[value])

    class Meta:
        model = Product
        fields = ["category"]


class ProductListView(generics.ListAPIView):
    """
    PRD Module 1 (New Arrivals / Product List) and Module 2 (Explore All
    Products) — same endpoint, different query params from the frontend.
    """

    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.filter(is_publishable=True).order_by("-published_at")
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = ProductFilter
    ordering_fields = ["published_at", "price_inr", "save_count"]
    search_fields = ["title", "description"]


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.filter(is_publishable=True).select_related("origin_dream")


class ProductSaveView(APIView):
    """
    POST toggles save state for the authenticated user.
    Creates or deletes a wardrobe.SavedItem and keeps Product.save_count in sync
    via F() expressions to avoid race conditions.

    SavedItem is imported inside the method body (deferred) to avoid a circular
    import: wardrobe.models already imports catalog.models at module level, so
    catalog must not import wardrobe at module level.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        from apps.wardrobe.models import SavedItem

        product = generics.get_object_or_404(
            Product.objects.filter(is_publishable=True), pk=pk
        )
        existing = SavedItem.objects.filter(user=request.user, product=product).first()

        if existing:
            existing.delete()
            Product.objects.filter(pk=product.pk).update(save_count=F("save_count") - 1)
            product.refresh_from_db(fields=["save_count"])
            return Response({"save_count": product.save_count, "is_saved": False})

        SavedItem.objects.create(user=request.user, product=product)
        Product.objects.filter(pk=product.pk).update(save_count=F("save_count") + 1)
        product.refresh_from_db(fields=["save_count"])
        return Response({"save_count": product.save_count, "is_saved": True})


class ProductLoveView(APIView):
    """POST /api/products/<pk>/love/ — increments love_count once per request (no un-love)."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        product = generics.get_object_or_404(
            Product.objects.filter(is_publishable=True), pk=pk
        )
        Product.objects.filter(pk=product.pk).update(love_count=F("love_count") + 1)
        product.refresh_from_db(fields=["love_count"])
        return Response({"love_count": product.love_count})
