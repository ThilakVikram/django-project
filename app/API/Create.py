from django.shortcuts import render,redirect
from django.http import JsonResponse
from app.modelsForm import *

def CreateTemplate(req,modelform):
    if(req.method == "POST"):
        data = modelform(req.POST)
        if(data.is_valid()):
            data.save()
            return redirect("Success")
        else:
            return redirect("Error")
    else:
        return JsonResponse("Only Post Method Allowed")

def CreateMember(req):
    return CreateTemplate(req,Memberform)

def CreateMembership(req):
    return CreateTemplate(req,Membershipform)

def CreatePurchase(req):
    return CreateTemplate(req,Purchaseform)

def CreatePayment(req):
    return CreateTemplate(req,Paymentform)

def CreateFitness(req):
    return CreateTemplate(req,Fitnessform)