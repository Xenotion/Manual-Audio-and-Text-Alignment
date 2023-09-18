from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import TextFile  # Make sure your model is adjusted for text files.
from .serialiser import TextFileSerializer  # Adjust your serializer for text files.
from django.views.decorators.csrf import csrf_exempt

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        # This method retrieves all the text files in the database
        files = TextFile.objects.all()
        file_serializer = TextFileSerializer(files, many=True)
        return Response(file_serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # This method saves a text file from the frontend to the database
        file_serializer = TextFileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

