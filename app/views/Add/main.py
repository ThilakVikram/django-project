from django.shortcuts import render,redirect

def Add(req):
    return render(req,"Add/index.html")