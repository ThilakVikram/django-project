from django.urls import path
from app.views.Add.main import Add

urlpatterns = [
    path("",Add,name="add")
]
