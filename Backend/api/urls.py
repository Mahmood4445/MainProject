from django.urls import path
from .views import ReviewListCreateView, ReviewDetailView, CreatePaymentRequestView, HitPayWebhookView, PaymentStatusView, ManualStatusUpdateView

urlpatterns = [
    path("reviews/", ReviewListCreateView.as_view(), name="review-list"),
    path("reviews/<int:pk>/", ReviewDetailView.as_view(), name="review-detail"),
    path("payments/create/", CreatePaymentRequestView.as_view(), name="create-payment"),
    path("payments/hitpay/webhook/", HitPayWebhookView.as_view(), name="hitpay-webhook"),
    path("payments/status/<str:reference_number>/", PaymentStatusView.as_view(), name="payment-status"),
    path("payments/update-status/<str:reference_number>/", ManualStatusUpdateView.as_view(), name="manual-status-update"),
]
