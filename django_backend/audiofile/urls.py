from django.urls import path
from .views import FileUploadView

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('audiofiles/', FileUploadView.as_view(), name='textfile-list'),
    # other url patterns
]
