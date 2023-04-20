from django.contrib import admin

from .models import HatDetails, LocationVO


@admin.register(HatDetails)
class HatDEtailsAdmin(admin.ModelAdmin):
    pass


@admin.register(LocationVO)
class LocationVOAdmin(admin.ModelAdmin):
    pass
