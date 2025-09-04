#!/usr/bin/env python3
"""
Create a payment that will be marked as failed in HitPay dashboard
This simulates a real payment failure scenario
"""

import requests
import json
import time

# Backend API URL
BACKEND_URL = "http://localhost:8000"

def create_payment_for_failure_test():
    """Create a payment that we can then mark as failed"""
    
    print("🎯 Creating Payment for HitPay Failure Test")
    print("=" * 50)
    
    # Create a normal payment first
    payment_data = {
        "name": "Test User - Failure Test",
        "email": "test-failure@example.com",
        "amount": 15.50,
        "currency": "SGD",
        "purpose": "HitPay Dashboard Failure Test",
        "phone": "1234567890"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/payments/create/",
            json=payment_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.ok:
            result = response.json()
            reference_number = result.get('reference_number')
            checkout_url = result.get('checkout_url')
            
            print(f"✅ Payment created successfully!")
            print(f"Reference Number: {reference_number}")
            print(f"Checkout URL: {checkout_url}")
            print(f"Amount: {payment_data['amount']} {payment_data['currency']}")
            
            return reference_number, checkout_url
        else:
            print(f"❌ Payment creation failed: {response.text}")
            return None, None
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return None, None

def simulate_hitpay_failure_scenarios():
    """Simulate different HitPay failure scenarios"""
    
    print("\n🧪 Simulating HitPay Failure Scenarios")
    print("=" * 50)
    
    # Create a payment first
    reference_number, checkout_url = create_payment_for_failure_test()
    
    if not reference_number:
        print("❌ Cannot proceed without a valid payment")
        return
    
    print(f"\n📋 Payment Details:")
    print(f"Reference: {reference_number}")
    print(f"Checkout URL: {checkout_url}")
    
    print(f"\n🎯 To simulate failure in HitPay dashboard:")
    print(f"1. Open the checkout URL in your browser")
    print(f"2. Start the payment process")
    print(f"3. Use test card: 4000 0000 0000 0002 (declined card)")
    print(f"4. Or cancel the payment before completion")
    print(f"5. Or let the payment timeout")
    
    print(f"\n📊 After failure, check status:")
    print(f"Backend: http://localhost:8000/api/payments/status/{reference_number}/")
    print(f"Frontend: http://localhost:8080/payment/status?reference_number={reference_number}")
    
    print(f"\n🔍 Check HitPay Dashboard:")
    print(f"1. Log into your HitPay dashboard")
    print(f"2. Look for payment with reference: {reference_number}")
    print(f"3. Check if it shows as 'failed' or 'cancelled'")
    print(f"4. Review the failure reason in HitPay logs")

def test_with_declined_card():
    """Test with a known declined card"""
    
    print("\n💳 Testing with Declined Card")
    print("=" * 50)
    
    # Create another payment for declined card test
    payment_data = {
        "name": "Declined Card Test",
        "email": "declined-test@example.com",
        "amount": 25.00,
        "currency": "SGD",
        "purpose": "Declined Card Test - HitPay Dashboard",
        "phone": "1234567890"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/payments/create/",
            json=payment_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.ok:
            result = response.json()
            reference_number = result.get('reference_number')
            checkout_url = result.get('checkout_url')
            
            print(f"✅ Payment created for declined card test!")
            print(f"Reference Number: {reference_number}")
            print(f"Checkout URL: {checkout_url}")
            
            print(f"\n💳 Use this declined card:")
            print(f"Card Number: 4000 0000 0000 0002")
            print(f"Expiry: Any future date")
            print(f"CVV: Any 3 digits")
            print(f"Result: Payment will be declined and marked as failed in HitPay")
            
            print(f"\n📊 Check failure in HitPay dashboard:")
            print(f"Reference: {reference_number}")
            
        else:
            print(f"❌ Payment creation failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")

def check_recent_payments():
    """Check status of recent payments"""
    
    print("\n📊 Recent Payment Status Check")
    print("=" * 50)
    
    # List of recent reference numbers from our tests
    recent_payments = [
        "c0e5a21b-afa0-4fdc-92e2-018ddfb45e23",  # Large amount test
        "d4c4ae7b-e99a-42a2-a8ad-60e34ff3c029",  # Long purpose test
    ]
    
    for ref in recent_payments:
        try:
            response = requests.get(f"{BACKEND_URL}/api/payments/status/{ref}/")
            if response.ok:
                data = response.json()
                print(f"Reference: {ref}")
                print(f"Status: {data.get('status')}")
                print(f"Amount: {data.get('amount')} {data.get('currency')}")
                print(f"Created: {data.get('created_at')}")
                print("-" * 30)
        except Exception as e:
            print(f"Error checking {ref}: {str(e)}")

if __name__ == "__main__":
    print("🎯 HitPay Dashboard Failure Test")
    print("This will create payments that can be failed in HitPay dashboard")
    print("=" * 60)
    
    # Run the tests
    simulate_hitpay_failure_scenarios()
    test_with_declined_card()
    check_recent_payments()
    
    print("\n" + "=" * 60)
    print("✅ HitPay Dashboard Failure Tests Complete!")
    print("\n📝 Instructions:")
    print("1. Use the checkout URLs provided above")
    print("2. Complete or cancel the payment in HitPay")
    print("3. Check your HitPay dashboard for failed payments")
    print("4. Verify the failure is recorded in HitPay logs")
    print("5. Test your frontend with the failed payment reference numbers")
    print("\n🔗 HitPay Dashboard:")
    print("https://dashboard.hit-pay.com/ (or your sandbox URL)")
    print("\n📧 Check your email for payment failure notifications")
