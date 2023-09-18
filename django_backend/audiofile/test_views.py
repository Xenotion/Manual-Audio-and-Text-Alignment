from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import TextFile
import io
from django.core.files.uploadedfile import SimpleUploadedFile

class FileUploadViewTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()

        # Sample text file for uploading
        content = io.StringIO("Some sample text content for testing.")
        self.file = SimpleUploadedFile("test_file.txt", content.getvalue().encode('utf-8'))

    def test_upload_textfile(self):
        # Test the POST request (file uploading)
        url = reverse('file-upload')
        data = {'file': self.file}
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TextFile.objects.count(), 1)
        print("POST request test success!")

    def test_retrieve_textfiles(self):
        # Create a sample TextFile instance
        TextFile.objects.create(file=self.file)

        # Test the GET request (retrieving all text files)
        url = reverse('textfile-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        print("GET request test success!")
