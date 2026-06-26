"""
OTP generation/sending lives here, isolated from the views, so swapping the
SMS provider (Twilio, MSG91, etc. — see architecture doc Section 11.1) later
means changing this one file only.
"""
import random
from django.conf import settings
from .models import OTPRequest


def generate_and_send_otp(phone: str) -> None:
    code = f"{random.randint(0, 999999):06d}"
    OTPRequest.objects.create(phone=phone, code=code)

    if settings.DEBUG:
        print(f"[DEV ONLY] OTP for {phone}: {code}")
        return

    # TODO: call real SMS provider here using settings.OTP_PROVIDER_API_KEY
    raise NotImplementedError("Wire up a real OTP provider before going to production.")


def verify_otp(phone: str, code: str) -> bool:
    match = (
        OTPRequest.objects.filter(phone=phone, code=code, consumed=False)
        .order_by("-created_at")
        .first()
    )
    if not match:
        return False
    match.consumed = True
    match.save(update_fields=["consumed"])
    return True
