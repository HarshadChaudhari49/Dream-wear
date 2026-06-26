"""
Checkout and Razorpay integration, isolated from views so the payment
provider could be swapped without touching request handling.
"""
from django.conf import settings
from django.db import transaction
from .models import Order, OrderItem, CartItem


def get_razorpay_client():
    import razorpay
    return razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


@transaction.atomic
def checkout(user) -> Order:
    """Converts the user's CartItems into an Order + OrderItems.
    Creates a Razorpay order only when keys are configured (skipped in dev/test).
    """
    cart_items = CartItem.objects.filter(user=user).select_related("product")
    if not cart_items.exists():
        raise ValueError("Cart is empty.")

    total = sum(item.product.price_inr * item.quantity for item in cart_items)
    order = Order.objects.create(user=user, total_inr=total)

    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price_at_purchase_inr=item.product.price_inr,
        )

    if settings.RAZORPAY_KEY_ID and settings.RAZORPAY_KEY_SECRET:
        client = get_razorpay_client()
        razorpay_order = client.order.create({
            "amount": int(total * 100),  # paise
            "currency": "INR",
            "receipt": str(order.id),
        })
        order.razorpay_order_id = razorpay_order["id"]
        order.save(update_fields=["razorpay_order_id"])

    cart_items.delete()

    try:
        from apps.notifications.models import NotificationType
        from apps.notifications.services import send_notification
        send_notification(
            user,
            NotificationType.SHIPPING_UPDATE,
            "Your order is confirmed. Each piece is being packed with care.",
        )
    except Exception:
        pass

    return order
