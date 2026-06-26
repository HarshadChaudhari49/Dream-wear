from django.contrib import admin
from .models import Order, OrderItem, CartItem, OrderStatus


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ["product", "quantity", "price_at_purchase_inr"]
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "status", "carrier", "tracking_ref", "total_inr", "created_at"]
    list_filter = ["status", "carrier"]
    search_fields = ["user__phone", "razorpay_order_id", "tracking_ref"]
    readonly_fields = ["razorpay_order_id", "razorpay_payment_id", "total_inr", "created_at"]
    inlines = [OrderItemInline]
    actions = ["mark_as_shipped", "mark_as_delivered", "mark_as_cancelled"]

    @admin.action(description="Mark selected orders as Shipped")
    def mark_as_shipped(self, request, queryset):
        updated = queryset.filter(status=OrderStatus.PAID).update(status=OrderStatus.SHIPPED)
        self.message_user(request, f"{updated} order(s) marked as Shipped.")

    @admin.action(description="Mark selected orders as Delivered")
    def mark_as_delivered(self, request, queryset):
        updated = queryset.filter(status=OrderStatus.SHIPPED).update(status=OrderStatus.DELIVERED)
        self.message_user(request, f"{updated} order(s) marked as Delivered.")

    @admin.action(description="Cancel selected orders")
    def mark_as_cancelled(self, request, queryset):
        updated = queryset.exclude(
            status__in=[OrderStatus.DELIVERED, OrderStatus.CANCELLED]
        ).update(status=OrderStatus.CANCELLED)
        self.message_user(request, f"{updated} order(s) cancelled.")


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ["user", "product", "quantity", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["user__phone", "product__title"]
    readonly_fields = ["created_at"]
