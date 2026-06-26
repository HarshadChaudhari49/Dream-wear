from django.conf import settings
from django.db import models
from apps.core.models import AbstractBaseModel
from apps.catalog.models import Product


class OrderStatus(models.TextChoices):
    PENDING_PAYMENT = "pending_payment", "Pending payment"
    PAID = "paid", "Paid"
    SHIPPED = "shipped", "Shipped"
    DELIVERED = "delivered", "Delivered"
    CANCELLED = "cancelled", "Cancelled"


class Carrier(models.TextChoices):
    """PRD confirmed tech stack: Delhivery, BlueDart, India Post."""
    DELHIVERY = "delhivery", "Delhivery"
    BLUEDART = "bluedart", "BlueDart"
    INDIA_POST = "india_post", "India Post"


class Order(AbstractBaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")
    status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.PENDING_PAYMENT)
    carrier = models.CharField(max_length=20, choices=Carrier.choices, blank=True)
    tracking_ref = models.CharField(max_length=100, blank=True)
    total_inr = models.DecimalField(max_digits=10, decimal_places=2)

    razorpay_order_id = models.CharField(max_length=100, blank=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Order({self.id}) — {self.user} — {self.status}"


class OrderItem(models.Model):
    """Price/quantity captured at time of purchase — deliberately not live-linked to Product.price_inr."""

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name="order_items")
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase_inr = models.DecimalField(max_digits=10, decimal_places=2)


class CartItem(AbstractBaseModel):
    """Simple persistent cart — one row per user/product pair."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart_items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="in_carts")
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ["user", "product"]
