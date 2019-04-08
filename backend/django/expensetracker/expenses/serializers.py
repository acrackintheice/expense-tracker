from .models import GoogleUser, Expense, Tag
from rest_framework import serializers

class GoogleUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GoogleUser
        fields = ('username', 'email', 'googleId')

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ('url', 'name', 'icon')

class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    tag = TagSerializer(read_only=False, many=False)

    class Meta:
        model = Expense
        fields = ('url', 'location', 'date', 'value', 'tag')

    def create(self, validated_data):

        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        location = validated_data.get('location')
        date = validated_data.get('date')
        value = validated_data.get('value')
        tagName = validated_data.get('tag').get('name')
        tagIcon = validated_data.get('tag').get('icon')

        try:
            tag = Tag.objects.get(name=tagName, icon=tagIcon)
        except Tag.DoesNotExist:
            tag = Tag.objects.create(name=tagName, icon=tagIcon)

        return Expense.objects.create(location=location, date=date, value=value, tag=tag, user=user)

    def update(self, instance, validated_data):
        instance.location = validated_data.get('email', instance.location)
        instance.date = validated_data.get('date', instance.date)
        instance.value = validated_data.get('value', instance.value)
        incomingTag = validated_data.get('tag')
        
        try:
            tag = Tag.objects.get(name=incomingTag.get('name'), icon=incomingTag.get('icon'))
        except Tag.DoesNotExist:
            tag = Tag.objects.create(Tag(name=incomingTag.get('name'), icon=incomingTag.get('icon')))

        instance.tag = tag
        instance.save()

        return instance