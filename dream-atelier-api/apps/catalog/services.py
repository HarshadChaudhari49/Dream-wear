"""
Product publishing. Calls apps.dreams.services.can_become_product() rather
than re-checking Dream status here — one gate, one place, per architecture
doc Section 6.1.
"""
from django.core.exceptions import ValidationError
from django.utils import timezone
from apps.dreams import services as dream_services
from .models import Product


def publish_product_from_dream(dream, **product_fields) -> Product:
    if not dream_services.can_become_product(dream):
        raise ValidationError(
            "This dream cannot become a product yet — it must be Live with consent granted."
        )
    if hasattr(dream, "product"):
        raise ValidationError("This dream already has a product.")

    product = Product.objects.create(
        origin_dream=dream,
        is_publishable=True,
        published_at=timezone.now(),
        **product_fields,
    )
    return product
