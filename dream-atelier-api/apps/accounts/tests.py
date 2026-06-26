"""
Per CLAUDE.md's goal-driven execution principle: write a test that captures
the desired behavior, then make it pass. Examples below are stubs showing
the intended shape — fill in as features land.
"""
import pytest
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_otp_request_then_verify_returns_tokens():
    client = APIClient()

    resp = client.post("/api/auth/otp/request/", {"phone": "+919999999999"})
    assert resp.status_code == 200

    from apps.accounts.models import OTPRequest
    otp = OTPRequest.objects.latest("created_at")

    resp = client.post("/api/auth/otp/verify/", {"phone": "+919999999999", "code": otp.code})
    assert resp.status_code == 200
    assert "access_token" in resp.data
