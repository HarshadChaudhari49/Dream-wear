from django.urls import path
from .views import DreamListCreateView, DreamDetailView, DreamConsentView, DreamFeedView

urlpatterns = [
    path("", DreamListCreateView.as_view(), name="dream-list-create"),
    path("feed/", DreamFeedView.as_view(), name="dream-feed"),
    path("<uuid:pk>/", DreamDetailView.as_view(), name="dream-detail"),
    path("<uuid:pk>/consent/", DreamConsentView.as_view(), name="dream-consent"),
]
