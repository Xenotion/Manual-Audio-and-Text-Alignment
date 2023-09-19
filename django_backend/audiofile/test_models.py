from django.test import TestCase
from .models import TextFile
import io
from django.core.files.uploadedfile import SimpleUploadedFile

class TextFileModelTestCase(TestCase):

    def setUp(self):
        # Create a sample text file
        content = io.StringIO("Some sample text content for testing.")
        self.file = SimpleUploadedFile("test_file.txt", content.getvalue().encode('utf-8'))
        self.text_file = TextFile.objects.create(file=self.file)

    def test_textfile_created(self):
        # Ensure the TextFile instance was created
        self.assertEqual(TextFile.objects.count(), 1)
        self.assertTrue(self.text_file.file.name.startswith("text_files/test_file"))
        print("Model testing success!")
