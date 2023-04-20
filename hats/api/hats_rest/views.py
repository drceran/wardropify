# from django.shortcuts import render
from common.json import ModelEncoder
from .models import HatDetails, LocationVO
# import json
from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number"]


class HatDetailsEncoder(ModelEncoder):
    model = HatDetails
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }


def api_show_hats(request, id):
    hats = HatDetails.objects.get(id=id)
    return JsonResponse(
        hats,
        encoder=HatDetailsEncoder,
        safe=False
    )
