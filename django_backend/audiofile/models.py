from django.db import models

class TextFile(models.Model):
    file = models.FileField(upload_to='text_files/')
