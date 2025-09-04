# Test script to manually update payment status
import requests
import json

def update_payment_status(reference_number, new_status):
    """Manually update payment status for testing"""
    url = f"http://localhost:8000/api/payments/update-status/{reference_number}/"
    
    data = {
        "status": new_status
    }
    
    try:
        response = requests.post(
            url,
            headers={'Content-Type': 'application/json'},
            data=json.dumps(data)
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Payment status updated successfully!")
            print(f"Reference Number: {result.get('reference_number')}")
            print(f"New Status: {result.get('status')}")
            return result
        else:
            print(f"❌ Status update failed: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return None

def check_payment_status(reference_number):
    """Check current payment status"""
    url = f"http://localhost:8000/api/payments/status/{reference_number}/"
    
    try:
        response = requests.get(url)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Payment status retrieved!")
            print(f"Reference Number: {result.get('reference_number')}")
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
    print("🔧 Manual Payment Status Update Tool")
    print("=" * 50)
    
    # Get reference number from user
    reference_number = input("Enter payment reference number: ").strip()
    
    if not reference_number:
        print("❌ No reference number provided")
        exit()
    
    # Check current status
    print(f"\n📊 Checking current status for: {reference_number}")
    current_status = check_payment_status(reference_number)
    
    if current_status:
        print(f"\n🔄 Current status: {current_status.get('status')}")
        
        # Ask for new status
        print("\nSelect new status:")
        print("1. completed")
        print("2. failed")
        print("3. pending")
        
        choice = input("Enter choice (1-3): ").strip()
        
        status_map = {
            "1": "completed",
            "2": "failed", 
            "3": "pending"
        }
        
        if choice in status_map:
            new_status = status_map[choice]
            print(f"\n🔄 Updating status to: {new_status}")
            update_payment_status(reference_number, new_status)
            
            # Check updated status
            print(f"\n📊 Checking updated status...")
            check_payment_status(reference_number)
        else:
            print("❌ Invalid choice")
    else:
        print("❌ Could not retrieve payment status")
    
    print("\n" + "=" * 50)
    print("✅ Tool completed!")
