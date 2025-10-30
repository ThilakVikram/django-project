from django.shortcuts import render
from django.http import JsonResponse
from django.utils import timezone
from app.Views.Add import *
def HomePage(req):
    return render(req,"page/home.html")

def Success(req):
    return render(req,"page/success.html")

def Error(req):
    return render(req,"page/error.html")