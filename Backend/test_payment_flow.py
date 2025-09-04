# Test script for HitPay payment flow
import requests
import json

# Test data
test_payment_data = {
    "name": "John Doe",
    "email": "john@example.com",
    "amount": 10.00,
    "currency": "SGD",
    "purpose": "Test Payment",
    "phone": "+6598765432"
}

# Django backend URL
BACKEND_URL = "http://localhost:8000/api/payments/create/"

def test_payment_creation():
    """Test payment request creation"""
    print("🧪 Testing Payment Creation...")
    
    try:
        response = requests.post(
            BACKEND_URL,
            headers={'Content-Type': 'application/json'},
            data=json.dumps(test_payment_data)
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Payment created successfully!")
            print(f"Checkout URL: {result.get('checkout_url')}")
            print(f"Reference Number: {result.get('reference_number')}")
            print(f"Payment Request ID: {result.get('payment_request_id')}")
            
            # Test redirect URL
            redirect_url = f"http://localhost:8080/payment/status?reference_number={result.get('reference_number')}"
            print(f"🔗 Redirect URL: {redirect_url}")
            print("📝 After payment completion, user will be redirected to this URL")
            
            return result
        else:
            print(f"❌ Payment creation failed: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return None

def test_payment_status(reference_number):
    """Test payment status checking"""
    print(f"\n🧪 Testing Payment Status for: {reference_number}")
    
    try:
        status_url = f"http://localhost:8000/api/payments/status/{reference_number}/"
        response = requests.get(status_url)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Payment status retrieved!")
            print(f"Status: {result.get('status')}")
            print(f"Amount: {result.get('amount')} {result.get('currency')}")
            return result
        else:
            print(f"❌ Status check failed: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return None

if __name__ == "__main__":
    print("🚀 HitPay Payment Flow Test")
    print("=" * 40)
    
    # Test 1: Create payment
    payment_result = test_payment_creation()
    
    if payment_result:
        # Test 2: Check payment status
        reference_number = payment_result.get('reference_number')
        if reference_number:
            test_payment_status(reference_number)
    
    print("\n" + "=" * 40)
    print("✅ Test completed!")
