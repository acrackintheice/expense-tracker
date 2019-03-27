from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import GoogleUser, Tag, Expense

# Register your models here.
admin.site.register(GoogleUser, UserAdmin)
admin.site.register(Expense)
admin.site.register(Tag)