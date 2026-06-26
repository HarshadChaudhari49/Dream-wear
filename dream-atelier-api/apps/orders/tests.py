import pytest
from apps.accounts.models import User
from apps.catalog.models import Product
from .models import CartItem


@pytest.mark.django_db
def test_cart_total_reflects_quantity():
    user = User.objects.create_user(phone="+919876511111")
    product = Product.objects.create(title="Test Top", category="top", price_inr=1000, is_publishable=True)
    CartItem.objects.create(user=user, product=product, quantity=2)

    total = sum(i.product.price_inr * i.quantity for i in CartItem.objects.filter(user=user))
    assert total == 2000
