from django.urls import path
from .views import CartView, CartItemDetailView, OrderListView, CheckoutView, OrderTrackingView

urlpatterns = [
    path("cart/", CartView.as_view(), name="cart"),
    path("cart/<uuid:pk>/", CartItemDetailView.as_view(), name="cart-item-detail"),
    path("orders/", OrderListView.as_view(), name="order-list"),
    path("orders/checkout/", CheckoutView.as_view(), name="checkout"),
    path("orders/<uuid:pk>/tracking/", OrderTrackingView.as_view(), name="order-tracking"),
]
