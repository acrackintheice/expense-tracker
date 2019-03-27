from .models import GoogleUser, Expense, Tag
from rest_framework import serializers

class GoogleUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GoogleUser
        fields = ('url', 'username', 'email', 'googleId')

class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Expense
        fields = ('location', 'date', 'value', 'tag', 'user')

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', 'icon')