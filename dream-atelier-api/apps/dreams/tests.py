import pytest
from django.core.exceptions import ValidationError
from apps.accounts.models import User
from .models import Dream, DreamStatus
from . import services


@pytest.fixture
def dreamer(db):
    return User.objects.create_user(phone="+919876543210", name="Test Dreamer")


@pytest.fixture
def dream(db, dreamer):
    return Dream.objects.create(user=dreamer, free_text="Something soft for work.")


@pytest.mark.django_db
def test_cannot_grant_consent_before_delivery(dream):
    """The core integrity rule: no shortcuts to Live."""
    with pytest.raises(ValidationError):
        services.grant_consent(dream)


@pytest.mark.django_db
def test_full_happy_path_to_live(dream):
    dream.status = DreamStatus.IN_REVIEW
    dream.save()
    dream.status = DreamStatus.IN_PROGRESS
    dream.save()
    dream.status = DreamStatus.DELIVERED_TO_DREAMER
    dream.save()

    services.request_consent(dream)
    services.grant_consent(dream)

    dream.refresh_from_db()
    assert dream.status == DreamStatus.LIVE
    assert dream.consent_to_publish is True
    assert services.can_become_product(dream) is True


@pytest.mark.django_db
def test_decline_consent_does_not_go_live(dream):
    dream.status = DreamStatus.DELIVERED_TO_DREAMER
    dream.save()

    services.decline_consent(dream)

    dream.refresh_from_db()
    assert dream.status == DreamStatus.DECLINED_PAUSED
    assert dream.consent_to_publish is False
    assert services.can_become_product(dream) is False
