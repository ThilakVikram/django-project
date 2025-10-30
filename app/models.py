from django.db import models

# Create your models here.

class Member(models.Model):
    class Meta:
        db_table = "Member"
    memberid = models.BigAutoField(primary_key=True)
    membername = models.TextField(null=False)
    contactno = models.TextField(max_length=14)
    email = models.TextField(max_length=25)
    address = models.TextField()
    area = models.TextField(max_length=30)
    joineddate = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.memberid
    
class Membership(models.Model):
    class MemberShipPeriod(models.IntegerChoices):
        ONE = 1
        THREE = 2
        SIX = 6
        NINE = 9
        TWELVE = 12
    class Meta:
        db_table = "Membership"
    membershipid = models.BigAutoField(primary_key=True)
    membershipname = models.TextField()
    periodinmonth = models.IntegerField(choices=MemberShipPeriod.choices,default=MemberShipPeriod.ONE)
    amountininr = models.IntegerField(null=False)
    createddate = models.DateTimeField(null=False)
    
class Purchase(models.Model):
    class Meta:
        db_table = "Purchase"
    purchaseid = models.BigAutoField(primary_key=True)
    memberid = models.ForeignKey(to=Member,on_delete=models.CASCADE)
    membershipid = models.ForeignKey(to=Membership,on_delete=models.CASCADE)
    amount = models.IntegerField(null=False)
    date = models.DateTimeField(auto_now_add=True)
    
class Payment(models.Model):
    class Meta:
        db_table = "Payment"
    paymentid = models.BigAutoField(primary_key=True)
    purchaseid = models.ForeignKey(Purchase,on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    
class Fitness(models.Model):
    class Meta:
        db_table = "Fitness"
    fitnessid = models.BigAutoField(primary_key=True)
    memberid = models.ForeignKey(Member,on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)