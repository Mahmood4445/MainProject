from django.urls import path
from .views import ReviewListCreateView, ReviewDetailView, PDFMetaView, PDFDownloadView

urlpatterns = [
    path("reviews/", ReviewListCreateView.as_view(), name="review-list"),
    path("reviews/<int:pk>/", ReviewDetailView.as_view(), name="review-detail"),
    path("document/", PDFMetaView.as_view(), name="pdf-meta"),
    path("document/download/", PDFDownloadView.as_view(), name="pdf-download"),
]
