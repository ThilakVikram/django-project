from django.urls import path
from app.views.Home.main import *
urlpatterns = [
    path("",Home,name="home")
]
