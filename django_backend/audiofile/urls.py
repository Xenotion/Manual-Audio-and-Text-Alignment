from django.urls import path
from .views import FileUploadView, AudioFileListView

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('audiofiles/', AudioFileListView.as_view(), name='audiofile-list'),
    # other url patterns
]
