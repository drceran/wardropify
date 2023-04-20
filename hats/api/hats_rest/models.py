from django.db import models
from django.urls import reverse


class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()


class HatDetails(models.Model):
    fabric = models.CharField(max_length=150)
    style_name = models.CharField(max_length=150)
    color = models.CharField(max_length=150)
    picture = models.URLField(max_length=200)

    location = models.ForeignKey(
        LocationVO,
        related_name="location",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.style_name

    def get_api_url(self):
        return reverse("api_show_hats", kwargs={"pk": self.pk})
