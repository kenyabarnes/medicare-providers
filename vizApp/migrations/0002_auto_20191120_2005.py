# Generated by Django 2.2.7 on 2019-11-21 01:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vizApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='provider',
            name='state',
            field=models.CharField(max_length=20),
        ),
    ]
