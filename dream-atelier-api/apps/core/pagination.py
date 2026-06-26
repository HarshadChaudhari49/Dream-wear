from rest_framework.pagination import PageNumberPagination


class StandardPagination(PageNumberPagination):
    """Shared default pagination for every list endpoint across all apps."""

    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100
