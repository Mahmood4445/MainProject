from django.contrib import admin

from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("author_name", "rating", "created_at")
