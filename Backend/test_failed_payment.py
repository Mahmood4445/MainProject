#!/usr/bin/env python3
"""
Test script to create a payment that will likely fail in HitPay dashboard
This simulates real-world failure scenarios
"""

import requests
import json
import time

# Backend API URL
BACKEND_URL = "http://localhost:8000"

def test_failed_payment_scenarios():
    """Test different scenarios that might cause payment failures"""
    
    print("🚀 Testing Failed Payment Scenarios")
    print("=" * 50)
    
    # Test 1: Invalid amount (too small)
    print("\n🧪 Test 1: Invalid Amount (Too Small)")
    test_payment_with_amount(0.01)
    
    # Test 2: Invalid amount (too large)
    print("\n🧪 Test 2: Invalid Amount (Too Large)")
    test_payment_with_amount(999999.99)
    
    # Test 3: Invalid currency
    print("\n🧪 Test 3: Invalid Currency")
    test_payment_with_currency("INVALID")
    
    # Test 4: Missing required fields
    print("\n🧪 Test 4: Missing Required Fields")
    test_payment_missing_fields()
    
    # Test 5: Invalid email format
    print("\n🧪 Test 5: Invalid Email Format")
    test_payment_invalid_email()

def test_payment_with_amount(amount):
    """Test payment with specific amount"""
    payment_data = {
        "name": "Test User",
        "email": "test@example.com",
        "amount": amount,
        "currency": "SGD",
        "purpose": "Failed Payment Test",
        "phone": "1234567890"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/payments/create/",
            json=payment_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Amount: {amount}")
        print(f"Status Code: {response.status_code}")
        
        if response.ok:
            result = response.json()
            print(f"✅ Payment created: {result.get('reference_number')}")
            print(f"Checkout URL: {result.get('checkout_url')}")
            print("📝 This payment might fail in HitPay due to amount restrictions")
        else:
            print(f"❌ Payment creation failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")

def test_payment_with_currency(currency):
    """Test payment with invalid currency"""
    payment_data = {
        "name": "Test User",
        "email": "test@example.com",
        "amount": 10.00,
        "currency": currency,
        "purpose": "Failed Payment Test - Invalid Currency",
        "phone": "1234567890"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/payments/create/",
            json=payment_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Currency: {currency}")
        print(f"Status Code: {response.status_code}")
        
        if response.ok:
            result = response.json()
            print(f"✅ Payment created: {result.get('reference_number')}")
            print(f"Checkout URL: {result.get('checkout_url')}")
            print("📝 This payment might fail in HitPay due to unsupported currency")
        else:
            print(f"❌ Payment creation failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")

def test_payment_missing_fields():
    """Test payment with missing required fields"""
    payment_data = {
        "name": "",  # Missing name
        "email": "",  # Missing email
        "amount": 10.00,
        "currency": "SGD",
        "purpose": "Failed Payment Test - Missing Fields"
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
            print(f"✅ Payment created: {result.get('reference_number')}")
            print("📝 This payment might fail in HitPay due to missing customer info")
        else:
            print(f"❌ Payment creation failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")

def test_payment_invalid_email():
    """Test payment with invalid email format"""
    payment_data = {
        "name": "Test User",
        "email": "invalid-email-format",  # Invalid email
        "amount": 10.00,
        "currency": "SGD",
        "purpose": "Failed Payment Test - Invalid Email",
        "phone": "1234567890"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/payments/create/",
            json=payment_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Email: invalid-email-format")
        print(f"Status Code: {response.status_code}")
        
        if response.ok:
            result = response.json()
            print(f"✅ Payment created: {result.get('reference_number')}")
            print(f"Checkout URL: {result.get('checkout_url')}")
            print("📝 This payment might fail in HitPay due to invalid email")
        else:
            print(f"❌ Payment creation failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")

def test_hitpay_specific_failures():
    """Test HitPay-specific failure scenarios"""
    print("\n🧪 Test 6: HitPay-Specific Failure Scenarios")
    print("=" * 50)
    
    # Test with very long purpose text (might cause issues)
    payment_data = {
        "name": "Test User",
        "email": "test@example.com",
        "amount": 10.00,
        "currency": "SGD",
        "purpose": "A" * 500,  # Very long purpose text
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
            print(f"✅ Payment created: {result.get('reference_number')}")
            print(f"Checkout URL: {result.get('checkout_url')}")
            print("📝 This payment might fail in HitPay due to very long purpose text")
        else:
            print(f"❌ Payment creation failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")

def check_payment_statuses():
    """Check status of recent payments"""
    print("\n📊 Checking Recent Payment Statuses")
    print("=" * 50)
    
    # You can add logic here to check multiple payment statuses
    # For now, we'll just show how to check one
    print("To check payment status, use:")
    print("python -c \"import requests; response = requests.get('http://localhost:8000/api/payments/status/REFERENCE_NUMBER/'); print(response.json())\"")

if __name__ == "__main__":
    print("🎯 HitPay Failed Payment Test Suite")
    print("This script creates payments that are likely to fail in HitPay dashboard")
    print("=" * 60)
    
    # Run all tests
    test_failed_payment_scenarios()
    test_hitpay_specific_failures()
    check_payment_statuses()
    
    print("\n" + "=" * 60)
    print("✅ Failed Payment Tests Complete!")
    print("\n📝 Next Steps:")
    print("1. Check your HitPay dashboard for failed payments")
    print("2. Look for payments with status 'failed' or 'cancelled'")
    print("3. Check payment logs for error messages")
    print("4. Test the frontend with failed payment reference numbers")
    print("\n🔗 To test frontend with failed payment:")
    print("http://localhost:8080/payment/status?reference_number=REFERENCE_NUMBER")
