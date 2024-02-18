from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Category(models.Model):
    name = models.CharField(max_length=100,unique=True)
    parent_category = models.IntegerField(null=False,blank=False,default=0)
    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category,null=False,on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000,default='desc')
    def __str__(self):
        return self.name

class Attribute(models.Model):
    name = models.CharField(max_length=30,unique=True,null=False,blank=False)

class AttributeValue(models.Model):
    attribute=models.ForeignKey(Attribute,on_delete=models.CASCADE)
    value = models.CharField(max_length=30,null=False,blank=False)
    class Meta:
        unique_together = ('attribute', 'value')

class VariationTypes(models.Model):
    product=models.ForeignKey('ProductVariation',on_delete=models.CASCADE)
    attribute=models.ForeignKey(Attribute,on_delete=models.CASCADE)
    value=models.ForeignKey(AttributeValue,on_delete=models.CASCADE)
    class Meta:
        unique_together = ('product', 'attribute','value')

class ProductVariation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    stock=models.IntegerField(null=False,blank=False,default=0)
    price = models.DecimalField(max_digits=10, decimal_places=3,default=0)

    def __str__(self):
        attributes_str = ', '.join(attr.name for attr in self.attributes.all())
        return f"{self.product.name} - {attributes_str}"

class EditedProducts(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    stock=models.IntegerField(null=False,blank=False,default=0)
    price = models.DecimalField(max_digits=10, decimal_places=3,default=0)

    def __str__(self):
        attributes_str = ', '.join(attr.name for attr in self.attributes.all())
        return f"{self.product.name} - {attributes_str}"
    
class User(models.Model):
    name=models.CharField(max_length=100)
    username=models.CharField(max_length=50)
    password=models.CharField(max_length=50)

class Cart(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    # MAXIMUM QUNATITY FOR A  PRODUCT IN CART IS 50
    quantity=models.IntegerField(default=0,
        validators=[
            MaxValueValidator(50),
            MinValueValidator(0)
        ])
    datetime=models.IntegerField(null=False,blank=False,default=0)

class Order(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    # MAXIMUM QUNATITY FOR A  PRODUCT IN ORDER IS 50
    quantity=models.IntegerField(default=0,
        validators=[
            MaxValueValidator(50),
            MinValueValidator(0)
        ])
    datetime=models.IntegerField(null=False,blank=False,default=0)

class DeliveredOrders(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    # MAXIMUM QUNATITY FOR A  PRODUCT IN ORDER IS 50
    quantity=models.IntegerField(default=0,
        validators=[
            MaxValueValidator(50),
            MinValueValidator(0)
        ])
    datetime=models.IntegerField(null=False,blank=False,default=0)
