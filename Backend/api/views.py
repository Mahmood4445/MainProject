import os
import hmac
import hashlib
import requests
import uuid
from django.conf import settings
from django.http import FileResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Review, Payment
from .serializers import ReviewSerializer
from django.utils import timezone
import json

# Reviews CRUD
class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all().order_by("-created_at")
    serializer_class = ReviewSerializer

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# HitPay Payment Views
class CreatePaymentRequestView(APIView):
    def post(self, request):
        try:
            # Extract payment data from request
            amount = request.data.get('amount')
            name = request.data.get('name')
            email = request.data.get('email')
            phone = request.data.get('phone', '')
            currency = request.data.get('currency', 'SGD')
            purpose = request.data.get('purpose', '')
            
            # Validate required fields
            if not all([amount, name, email]):
                return Response({
                    'error': 'Missing required fields: amount, name, email'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Create payment record in database
            payment = Payment.objects.create(
                reference_number=str(uuid.uuid4()),
                amount=amount,
                name=name,
                email=email,
                phone=phone,
                currency=currency,
                status='pending'
            )
            
            # Prepare HitPay API request
            hitpay_data = {
                'amount': str(amount),
                'currency': currency,
                'reference_number': str(payment.reference_number),
                'name': name,
                'email': email,
                'phone': phone,
                'purpose': purpose,  # Add purpose parameter
                'redirect_url': f"{settings.FRONTEND_URL}/payment/status?reference_number={payment.reference_number}",
                'webhook': "https://goeasytrip.com/api/webhooks/hitpay",  # Temporary for testing - replace with your webhook URL
            }
            
            # HitPay API headers
            headers = {
                'X-BUSINESS-API-KEY': settings.HITPAY_API_KEY,
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            }
            
            # Make request to HitPay API
            response = requests.post(
                f"{settings.HITPAY_API_BASE}/payment-requests",
                data=hitpay_data,
                headers=headers
            )
            
            if response.status_code in [200, 201]:
                response_data = response.json()
                
                # Update payment with HitPay response
                payment.payment_request_id = response_data.get('id')
                payment.checkout_url = response_data.get('url')
                payment.save()
                
                return Response({
                    'checkout_url': payment.checkout_url,
                    'payment_request_id': payment.payment_request_id,
                    'reference_number': str(payment.reference_number),
                    'status': 'pending'
                })
            else:
                # If HitPay request fails, delete the payment record
                payment.delete()
                return Response({
                    'error': f'HitPay API error: {response.text}'
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({
                'error': f'Server error: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt, name='dispatch')
class HitPayWebhookView(APIView):
    def post(self, request):
        try:
            # Get the HMAC from the request
            

            received_hmac = request.POST.get('hmac')

            # If no hmac in form-data, try JSON
            if not received_hmac:
                try:
                    data = json.loads(request.body.decode("utf-8"))
                    received_hmac = data.get("hmac")
                except Exception:
                    pass

            if not received_hmac:
                return Response({'error': 'No HMAC provided'}, status=status.HTTP_400_BAD_REQUEST)

            
            # Get all form data except hmac
            form_data = {}
            for key, value in request.POST.items():
                if key != 'hmac':
                    form_data[key] = value
            
            # Sort the form data by key
            sorted_data = sorted(form_data.items())
            
            # Concatenate key=value pairs
            concatenated_string = ''.join([f"{key}{value}" for key, value in sorted_data])
            
            # Compute HMAC-SHA256
            computed_hmac = hmac.new(
                settings.HITPAY_SALT.encode('utf-8'),
                concatenated_string.encode('utf-8'),
                hashlib.sha256
            ).hexdigest()
            
            # Verify HMAC
            if not hmac.compare_digest(computed_hmac, received_hmac):
                return Response({'error': 'HMAC verification failed'}, status=status.HTTP_400_BAD_REQUEST)
            
            # HMAC verified, process the webhook
            payment_request_id = form_data.get('payment_request_id')
            payment_id = form_data.get('payment_id')
            status = form_data.get('status')
            
            if not payment_request_id:
                return Response({'error': 'No payment_request_id provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Find the payment record
            try:
                payment = Payment.objects.get(payment_request_id=payment_request_id)
            except Payment.DoesNotExist:
                return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
            
            # Update payment status based on HitPay status
            if status == 'completed':
                payment.status = 'completed'
                payment.hitpay_payment_id = payment_id
                payment.hitpay_status = status
                payment.paid_at = timezone.now()
            elif status == 'failed':
                payment.status = 'failed'
                payment.hitpay_payment_id = payment_id
                payment.hitpay_status = status
            else:
                payment.hitpay_status = status
            
            payment.save()
            
            return Response({'status': 'success'})
            
        except Exception as e:
            return Response({
                'error': f'Webhook processing error: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Utility view to get payment status by reference number
class PaymentStatusView(APIView):
    def get(self, request, reference_number):
        try:
            payment = Payment.objects.get(reference_number=reference_number)
            return Response({
                'reference_number': str(payment.reference_number),
                'status': payment.status,
                'amount': str(payment.amount),
                'currency': payment.currency,
                'created_at': payment.created_at,
                'paid_at': payment.paid_at
            })
        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)

# Manual status update for testing (remove in production)
class ManualStatusUpdateView(APIView):
    def post(self, request, reference_number):
        try:
            payment = Payment.objects.get(reference_number=reference_number)
            new_status = request.data.get('status')
            
            if new_status in ['completed', 'failed', 'pending']:
                payment.status = new_status
                if new_status == 'completed':
                    payment.paid_at = timezone.now()
                payment.save()
                
                return Response({
                    'message': f'Payment status updated to {new_status}',
                    'reference_number': str(payment.reference_number),
                    'status': payment.status
                })
            else:
                return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
                
        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)


