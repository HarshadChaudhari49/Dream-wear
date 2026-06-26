# The ops app intentionally has no models of its own.
#
# Per architecture doc Section 3.2, this app holds admin customizations that
# go beyond what a default ModelAdmin provides for the dreams/catalog apps
# (e.g. "assign to designer" or "publish product from dream" actions). It
# exists as the designated place to add those customizations without
# bloating the dreams or catalog apps' own admin.py files.
#
# See admin.py for the actual custom admin actions.
