from django.db import models

# Create your models here.

class Provider(models.Model):
    id = models.IntegerField(primary_key = True)
    state = models.CharField(max_length = 20)
    name = models.CharField(max_length = 200)
    type = models.CharField(max_length = 100)
    year = models.IntegerField()

    def __str__(self):
        return self.name