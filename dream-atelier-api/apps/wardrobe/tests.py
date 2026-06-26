import pytest
from apps.accounts.models import User
from apps.catalog.models import Product
from .models import SavedItem


@pytest.mark.django_db
def test_saved_item_is_unique_per_user_product():
    user = User.objects.create_user(phone="+919876522222")
    product = Product.objects.create(title="Test Dress", category="dress", price_inr=2000, is_publishable=True)
    SavedItem.objects.create(user=user, product=product)

    with pytest.raises(Exception):
        SavedItem.objects.create(user=user, product=product)
