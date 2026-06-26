from django.urls import path
from .views import BannerListView, ProductListView, ProductDetailView, ProductSaveView, ProductLoveView

urlpatterns = [
    path("banners/", BannerListView.as_view(), name="banner-list"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<uuid:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path("products/<uuid:pk>/save/", ProductSaveView.as_view(), name="product-save"),
    path("products/<uuid:pk>/love/", ProductLoveView.as_view(), name="product-love"),
]
