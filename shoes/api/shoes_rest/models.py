from django.db import models


# Create your models here.


class BinVO(models.Model):
    import_href = models.CharField(unique=True, max_length=200)
    name = models.CharField(max_length=200)


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("model_name",)
