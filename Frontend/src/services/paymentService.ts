// API service for payment operations
const API_BASE_URL = 'http://localhost:8000/api';

export interface PaymentRequestData {
  name: string;
  email: string;
  amount: number;
  currency: string;
  purpose?: string;
  phone?: string;
}

export interface PaymentResponse {
  checkout_url: string;
  payment_request_id: string;
  reference_number: string;
  status: string;
}

export interface PaymentStatus {
  reference_number: string;
  status: string;
  amount: string;
  currency: string;
  created_at: string;
  paid_at?: string;
}

class PaymentService {
  // Create payment request
  async createPayment(data: PaymentRequestData): Promise<PaymentResponse> {
    console.log('Creating payment request...', data);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    try {
      const response = await fetch(`${API_BASE_URL}/payments/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('Payment API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment');
      }

      const result = await response.json();
      console.log('Payment created successfully:', result);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      throw error;
    }
  }

  // Get payment status by reference number
  async getPaymentStatus(referenceNumber: string): Promise<PaymentStatus> {
    const response = await fetch(`${API_BASE_URL}/payments/status/${referenceNumber}/`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get payment status');
    }

    return response.json();
  }

  // Poll payment status
  async pollPaymentStatus(referenceNumber: string, maxAttempts = 30): Promise<PaymentStatus> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const status = await this.getPaymentStatus(referenceNumber);
        
        // If payment is completed or failed, return the status
        if (status.status === 'completed' || status.status === 'failed') {
          return status;
        }
        
        // Wait 2 seconds before next attempt
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Polling attempt ${attempt + 1} failed:`, error);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    throw new Error('Payment status polling timeout');
  }
}

export const paymentService = new PaymentService();
