from rest_framework import viewsets
from .models import Company, IPO, Document
from .serializers import CompanySerializer, IPOSerializer, DocumentSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class IPOViewSet(viewsets.ModelViewSet):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


from django.shortcuts import render

def index(request):
    return render(request, 'index.html')
