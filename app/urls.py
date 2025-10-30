from django.urls import path,include
from . import views

urlpatterns = [
    path("",views.HomePage,name="HomePage"),
    path("error",views.Error,name="error"),
    path("success",views.Success,name="success"),
    path("addmember",views.Add_Member,name="addmember")
]