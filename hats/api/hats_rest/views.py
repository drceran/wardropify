# from django.shortcuts import render
from common.json import ModelEncoder
from .models import HatDetails, LocationVO
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number"]


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "import_href"]


class HatListEncoder(ModelEncoder):
    model = HatDetails
    properties = ["fabric", "style_name", "color", "location"]
    encoders = {"location": LocationVOEncoder()}


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


@require_http_methods({"GET", "POST"})
def api_show_hats(request):
    if request.method == "GET":
        hatdetails = HatDetails.objects.all()
        return JsonResponse(
            {"hatdetails": hatdetails},
            encoder=HatDetailsEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location = LocationVO.objects.get(import_href=content["location"])
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hatdetails = HatDetails.objects.create(**content)
        return JsonResponse(
            hatdetails,
            encoder=HatDetailsEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_hat_detail(request, id):
    count, _ = HatDetails.objects.get(id=id).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods({"GET", "POST"})
def api_show_locations(request):
    if request.method == "GET":
        locations = LocationVO.objects.all()
        return JsonResponse(
            {"locations": locations},
            encoder=LocationVOEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location = LocationVO.objects.get(import_href=content["location"])
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        location = LocationVO.objects.create(**content)
        return JsonResponse(
            location,
            encoder=LocationVOEncoder,
            safe=False
        )
