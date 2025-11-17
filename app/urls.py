from django.urls import path,include
# from app.VIEWS.Add.main import * 
from django.shortcuts import redirect

def HomeRedirector(req):
    return redirect("home")

urlpatterns = [
    path("home/",include("app.views.Home.urls")),
    path("add/",include("app.views.Add.urls")),
    path("api/",include("app.API.urls")),
    path("",HomeRedirector,name="index")
]