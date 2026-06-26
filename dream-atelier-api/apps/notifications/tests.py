import pytest
from . import services


def test_calm_tone_passes_gentle_copy():
    assert services.violates_calm_tone("Still thinking about this one?") is False


def test_calm_tone_blocks_urgency():
    assert services.violates_calm_tone("BUY NOW before it's gone!!") is True


def test_calm_tone_blocks_scarcity():
    assert services.violates_calm_tone("Only 2 left in stock") is True
