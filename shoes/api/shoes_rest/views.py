from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Shoe, BinVO
from django.views.decorators.http import require_http_methods
import json

# Create your views here.

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "bin_number", "bin_size"]

class BinVODetailEncoder(ModelEncoder):
    model=BinVO
    properties=["closet_name", "import_href"]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "model_name", "bin"]
    encoders = {"bin": BinVOEncoder()}


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "bin",
        "picture_url", "color",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
# bin_href=None
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            bin = BinVO.objects.get(import_href=content["bin"])
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_shoe_detail(request, id):
    # shoe = Shoe.objects.get(id=id)
    # if request.method == "GET":
    #     return JsonResponse(
    #         shoe,
    #         encoder=ShoeDetailEncoder,
    #         safe=False,
    #     )
    # elif request.method == "PUT":
    #     content = json.loads(request.body)
    #     Shoe.objects.filter(id=id).update(**content)
    #     return JsonResponse(
    #         shoe,
    #         encoder=ShoeDetailEncoder,
    #         safe=False,
    #     )
    # else:
    count, _ = Shoe.objects.filter(id=id).delete()
    return JsonResponse({"deleted": count > 0})
