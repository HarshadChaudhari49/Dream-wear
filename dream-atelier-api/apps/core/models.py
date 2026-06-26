import uuid
from django.db import models


class AbstractBaseModel(models.Model):
    """
    Every model in every app inherits this instead of models.Model directly.
    Gives every table a UUID primary key (never expose auto-increment ids in
    a public API) and consistent created/updated timestamps for free.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]
