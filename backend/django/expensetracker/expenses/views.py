from .models import GoogleUser, Expense, Tag
from rest_framework import viewsets
from .serializers import GoogleUserSerializer,ExpenseSerializer, TagSerializer

class GoogleUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = GoogleUser.objects.all().order_by('-date_joined')
    serializer_class = GoogleUserSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Expense.objects.all().order_by('-date')
    serializer_class = ExpenseSerializer

class TagViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Tag.objects.all().order_by('name')
    serializer_class = TagSerializer