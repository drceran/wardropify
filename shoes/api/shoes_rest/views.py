from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Shoe
from django.views.decorators.http import require_http_methods


# Create your views here.


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "model_name"]


@require_http_methods(["GET"])
def api_list_shoes(request):
    # if request.method == "GET":
    shoes = Shoe.objects.all()
    return JsonResponse(
        {"shoes": shoes},
        encoder=ShoeListEncoder,
        safe=False,
    )
