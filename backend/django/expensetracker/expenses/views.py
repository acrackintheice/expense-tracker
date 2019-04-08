from .models import GoogleUser, Expense, Tag
from rest_framework import status, viewsets
from .serializers import GoogleUserSerializer, ExpenseSerializer, TagSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from expenses.authentication import GoogleIdTokenAuthentication

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
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('user__googleId',)

class TagViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Tag.objects.all().order_by('name')
    serializer_class = TagSerializer