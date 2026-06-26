import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    """Custom manager since this User has no username/email — phone is the identifier."""

    def create_user(self, phone, name="", password=None, **extra_fields):
        if not phone:
            raise ValueError("Phone number is required")
        user = self.model(phone=phone, name=name, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, name="", password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(phone, name, password, **extra_fields)


class PhotoVisibility(models.TextChoices):
    PUBLIC = "public", "Public photo"
    AVATAR_ONLY = "avatar_only", "Illustrated avatar only"


class User(AbstractBaseUser, PermissionsMixin):
    """
    Phone-OTP-first user, per PRD: 'Authentication: Supabase Auth with Phone
    OTP' — re-implemented here on Django since Supabase is no longer in the
    stack, but the phone-first identity model is preserved.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=120, blank=True)
    bio = models.CharField(
        max_length=160, blank=True,
        help_text="Her own gentle bio line — PRD Module 5: 'Lover of soft fabrics and slow mornings'",
    )
    avatar_url = models.URLField(blank=True)
    photo_visibility = models.CharField(
        max_length=20, choices=PhotoVisibility.choices, default=PhotoVisibility.AVATAR_ONLY,
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.name or self.phone


class OTPRequest(models.Model):
    """
    Short-lived OTP codes. Swap the actual send mechanism (Twilio, MSG91,
    etc.) in services.py once a provider is chosen — see architecture doc
    Section 11.1.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone = models.CharField(max_length=20)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    consumed = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
