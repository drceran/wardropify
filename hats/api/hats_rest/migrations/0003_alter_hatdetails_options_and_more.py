# Generated by Django 4.0.3 on 2023-04-20 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hats_rest', '0002_locationvo_import_href_alter_hatdetails_location'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='hatdetails',
            options={'ordering': ('style_name',)},
        ),
        migrations.AlterField(
            model_name='locationvo',
            name='import_href',
            field=models.URLField(max_length=100, null=True),
        ),
    ]