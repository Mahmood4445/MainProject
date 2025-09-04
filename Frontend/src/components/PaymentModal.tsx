import { useState } from 'react';
import { X, Loader2, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { paymentService, PaymentRequestData } from '@/services/paymentService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaymentFormData {
  name: string;
  email: string;
  amount: string;
  currency: string;
  purpose: string;
  phone: string;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    name: '',
    email: '',
    amount: '',
    currency: 'SGD',
    purpose: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressMessage, setProgressMessage] = useState<string>('');
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string>('');

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProgressMessage('Validating payment details...');

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.amount) {
        throw new Error('Please fill in all required fields');
      }

      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      setProgressMessage('Creating payment request...');

      // Prepare payment data for backend
      const paymentData: PaymentRequestData = {
        name: formData.name,
        email: formData.email,
        amount: amount,
        currency: formData.currency,
        purpose: formData.purpose,
        phone: formData.phone
      };

      // Create payment request via Django backend
      const result = await paymentService.createPayment(paymentData);
      
      console.log('Payment created successfully:', result);
      console.log('Checkout URL:', result.checkout_url);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        amount: '',
        currency: 'SGD',
        purpose: '',
        phone: ''
      });
      
      // Show redirect message instead of alert
      if (result.checkout_url) {
        setCheckoutUrl(result.checkout_url);
        setShowRedirectMessage(true);
        setProgressMessage('');
      } else {
        console.error('No checkout URL received from backend');
        throw new Error('No checkout URL received. Please try again.');
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
      setProgressMessage('');
    }
  };

  const handleRedirect = () => {
    if (checkoutUrl) {
      console.log('Redirecting to HitPay checkout:', checkoutUrl);
      
      // Close modal immediately
      onClose();
      
      // Redirect in same tab (more reliable than popup)
      window.location.href = checkoutUrl;
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Show redirect message modal
  if (showRedirectMessage) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      >
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in slide-in-from-bottom-4 duration-300">
          {/* Redirect Message Header */}
          <div className="flex items-center justify-center p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Payment Created Successfully!</h2>
            </div>
          </div>

          {/* Redirect Message Body */}
          <div className="p-6 text-center space-y-4">
            <div className="space-y-2">
              <p className="text-gray-600 text-sm">
                Your payment request has been created successfully. You will now be redirected to HitPay's secure payment gateway to complete your transaction.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2">
                  <ExternalLink className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">Redirecting to HitPay Checkout</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                onClick={handleRedirect}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Continue to Payment
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowRedirectMessage(false);
                  onClose();
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in slide-in-from-bottom-4 duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Amount Field */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
              Amount *
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Currency Field */}
          <div className="space-y-2">
            <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
              Currency
            </Label>
            <Select
              value={formData.currency}
              onValueChange={(value) => handleInputChange('currency', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                <SelectItem value="MYR">MYR - Malaysian Ringgit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Purpose Field */}
          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-sm font-medium text-gray-700">
              Purpose
            </Label>
            <Input
              id="purpose"
              type="text"
              placeholder="Enter payment purpose (e.g., FIFA 16, Travel Package)"
              value={formData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Progress Message */}
          {progressMessage && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 text-blue-600 animate-spin mr-2" />
                <p className="text-sm text-blue-800">{progressMessage}</p>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Payment...
                </>
              ) : (
                'Process Payment'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
