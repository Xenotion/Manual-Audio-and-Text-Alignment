from django.shortcuts import render

# Create your views here.
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import AudioFile
from .serialiser import AudioFileSerializer
from rest_framework.generics import ListAPIView
from django.views.decorators.csrf import csrf_exempt

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    @csrf_exempt
    def post(self, request):
        file_serializer = AudioFileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AudioFileListView(ListAPIView):
    queryset = AudioFile.objects.all()
    serializer_class = AudioFileSerializer
