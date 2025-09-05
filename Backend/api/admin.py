from django.contrib import admin

from django.contrib import admin
from .models import Review, Payment

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("author_name", "rating", "created_at")

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("reference_number", "status", "amount", "currency", "created_at", "paid_at")
