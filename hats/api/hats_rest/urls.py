from django.urls import path
from .views import (
    api_show_hats,
    api_hat_delete,
    api_show_locations,
    api_hat_details,
    api_delete_location
    )


urlpatterns = [
    path("hatdetails/", api_show_hats, name="api_show_hats"),
    path("hatdetails/<int:id>/", api_hat_delete, name="api_hat_detail"),
    path("locations/<int:id>", api_show_locations, name="api_show_locations"),
    path(
        "locations/<int:id>/hatdetails/",
        api_hat_details,
        name="api_hat_details"
        ),
    path(
        "locations/<int:id>/",
        api_delete_location,
        name="api_delete_location"
    )
]
