import pytest
from django.core.exceptions import ValidationError
from apps.accounts.models import User
from apps.dreams.models import Dream, DreamStatus
from apps.dreams import services as dream_services
from . import services as catalog_services


@pytest.mark.django_db
def test_cannot_publish_product_before_dream_is_live():
    user = User.objects.create_user(phone="+919876500000")
    dream = Dream.objects.create(user=user, free_text="A soft kurti for travel.")

    with pytest.raises(ValidationError):
        catalog_services.publish_product_from_dream(dream, title="Soft travel kurti", category="kurti", price_inr=1499)


@pytest.mark.django_db
def test_publish_product_after_consent_granted():
    user = User.objects.create_user(phone="+919876500001")
    dream = Dream.objects.create(user=user, free_text="A bold top for celebrations.")
    dream.status = DreamStatus.DELIVERED_TO_DREAMER
    dream.save()
    dream_services.grant_consent(dream)

    product = catalog_services.publish_product_from_dream(
        dream, title="Bold celebration top", category="top", price_inr=1999,
    )
    assert product.is_publishable is True
    assert product.origin_dream_id == dream.id
