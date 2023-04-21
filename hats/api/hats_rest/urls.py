from django.urls import path
from .views import api_show_hats, api_hat_detail, api_show_locations


urlpatterns = [
    path("hatdetails/", api_show_hats, name="api_show_hats"),
    path("hatdetails/<int:id>/", api_hat_detail, name="api_hat_detail"),
    path("locations/", api_show_locations, name="api_show_locations"),
]
