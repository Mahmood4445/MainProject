from django.db import models
import uuid

class Review(models.Model):
    author_name = models.CharField(max_length=100)
    rating = models.IntegerField()
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author_name} ({self.rating}★)"

class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]
    
    # HitPay specific fields
    payment_request_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    reference_number = models.CharField(max_length=255, unique=True, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='SGD')
    
    # Payment details
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    
    # Status tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    checkout_url = models.URLField(blank=True, null=True)
    
    # HitPay response data
    hitpay_payment_id = models.CharField(max_length=255, blank=True, null=True)
    hitpay_status = models.CharField(max_length=50, blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid_at = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return f"Payment {self.reference_number} - {self.status} - {self.amount} {self.currency}"
    
    class Meta:
        ordering = ['-created_at']
