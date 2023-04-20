# Generated by Django 4.0.3 on 2023-04-20 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='binvo',
            name='name',
        ),
        migrations.AddField(
            model_name='binvo',
            name='bin_number',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AddField(
            model_name='binvo',
            name='bin_size',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AddField(
            model_name='binvo',
            name='closet_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='binvo',
            name='import_href',
            field=models.URLField(null=True),
        ),
    ]
