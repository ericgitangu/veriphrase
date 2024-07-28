# backend/api/urls.py
from django.urls import path
from .views import EncodeView, DecodeView
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('encode/', EncodeView.as_view(), name='encode'),
    path('decode/', DecodeView.as_view(), name='decode'),
]
