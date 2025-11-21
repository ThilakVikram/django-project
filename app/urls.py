from django.urls import path,include
# from app.VIEWS.Add.main import * 
from django.shortcuts import redirect,render
from django.http import JsonResponse
from app.modelsForm import Memberform

def HomeRedirector(req):
    return redirect("home")

def Sample(req):
    if(req.method == "POST"):
        print(req.POST)
        data = Memberform(req.POST)
        if data.is_valid():
            data.save()
            return JsonResponse({"status":"Success"})
        else:
            return JsonResponse({"status":"rejected"})
    return render(req,"Add/sample.html",{"form":Memberform})

urlpatterns = [
    path("home/",include("app.views.Home.urls")),
    path("add/",include("app.views.Add.urls")),
    path("api/",include("app.API.urls")),
    path("",HomeRedirector,name="index"),
    path("sample",Sample,name="sample")
]