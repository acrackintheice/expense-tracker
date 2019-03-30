from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=40)
    icon = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class GoogleUser(AbstractUser):
    googleId = models.CharField(max_length=20)

class Expense(models.Model):
    location = models.CharField(max_length=40)
    date = models.DateTimeField()
    value = models.DecimalField(default=0.0, max_digits=19, decimal_places=2)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    user = models.ForeignKey(GoogleUser, on_delete=models.CASCADE)
