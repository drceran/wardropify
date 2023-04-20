from django.urls import path
from .views import api_show_hats


urlpatterns = [
    path("hatdetails/<int:id>/", api_show_hats, name="api_show_hats"),
]
