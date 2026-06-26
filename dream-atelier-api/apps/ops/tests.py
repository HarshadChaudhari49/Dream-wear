import pytest
from apps.accounts.models import User
from apps.dreams.models import Dream, DreamStatus
from apps.dreams import services as dream_services


@pytest.mark.django_db
def test_publish_action_rejects_dream_not_yet_live(admin_client):
    user = User.objects.create_user(phone="+919876533333")
    dream = Dream.objects.create(user=user, free_text="A minimal dress for everyday.")

    from apps.catalog import services as catalog_services
    from django.core.exceptions import ValidationError

    with pytest.raises(ValidationError):
        catalog_services.publish_product_from_dream(dream, title="x", category="dress", price_inr=0)
