from django.shortcuts import render,redirect
from django.http import JsonResponse
from app import modelsForm
import json

def CreateTemplate(req,model):
    if(req.method == "POST"):
        print(req.POST)
        data = getattr(modelsForm,model+"form")(req.POST)
        if(data.is_valid()):
            data.save()
            return JsonResponse({"status":"success"})
        else:
            return JsonResponse({"status":"error"})
    else:
        return JsonResponse({"status":"Only Post Method Allowed"})