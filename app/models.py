from django.db import models

# Create your models here.
class Member(models.Model):
    class Meta:
        db_table = "Member"
    id = models.BigAutoField(primary_key=True)
    name = models.TextField(null=False)
    contactno = models.TextField(max_length=14)
    email = models.TextField(max_length=25)
    address = models.TextField()
    area = models.TextField(max_length=30)
    joineddate = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.memberid
    def getStructure(self):
        return ["name","contactno","email","address","area","joineddate"]
    
class Membership(models.Model):
    class MemberShipPeriod(models.IntegerChoices):
        ONE = 1
        THREE = 3
        SIX = 6
        NINE = 9
        TWELVE = 12
    class Meta:
        db_table = "Membership"
    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    periodinmonth = models.IntegerField(choices=MemberShipPeriod.choices,default=MemberShipPeriod.ONE)
    amountininr = models.IntegerField(null=False)
    createddate = models.DateTimeField(null=False)
    
    def getStructure(self):
        return ["id","name","periodinmonth","amountininr","createddate"]
    
class Purchase(models.Model):
    class Meta:
        db_table = "Purchase"
    id = models.BigAutoField(primary_key=True)
    memberid = models.ForeignKey(to=Member,on_delete=models.CASCADE)
    membershipid = models.ForeignKey(to=Membership,on_delete=models.CASCADE)
    amount = models.IntegerField(null=False)
    date = models.DateTimeField(auto_now_add=True)
    
    def getStructure(self,memberid = None,membershipid = None):
        return ["id","memberid","membershipid","amount"]
    
class Payment(models.Model):
    class Meta:
        db_table = "Payment"
    id = models.BigAutoField(primary_key=True)
    purchaseid = models.ForeignKey(Purchase,on_delete=models.CASCADE)
    amount = models.IntegerField(null=False,blank=False,default=0)
    date = models.DateTimeField(auto_now_add=True)
    
    def getStructure(self):
        return ["purchaseid","amount","date"]
    
class Fitness(models.Model):
    class Meta:
        db_table = "Fitness"
    id = models.BigAutoField(primary_key=True)
    memberid = models.ForeignKey(Member,on_delete=models.CASCADE)
    height = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    bmi = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    
    def getStructure(self):
        return ["memberid","height","weight","bmi","date"]