from django.urls import path
from .views import WishlistView, WardrobeView

urlpatterns = [
    path("wardrobe/", WardrobeView.as_view(), name="wardrobe"),
    path("wishlist/", WishlistView.as_view(), name="wishlist"),
]
