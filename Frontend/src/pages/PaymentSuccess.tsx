import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { paymentService } from '@/services/paymentService';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<string>('checking');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const referenceNumber = searchParams.get('reference_number');

  useEffect(() => {
    if (referenceNumber) {
      checkPaymentStatus(referenceNumber);
    } else {
      setError('No reference number found');
      setPaymentStatus('error');
    }
  }, [referenceNumber]);

  const checkPaymentStatus = async (refNumber: string) => {
    try {
      setPaymentStatus('checking');
      
      // Poll for payment status
      const status = await paymentService.pollPaymentStatus(refNumber);
      
      setPaymentDetails(status);
      
      if (status.status === 'completed') {
        setPaymentStatus('success');
      } else if (status.status === 'failed') {
        setPaymentStatus('failed');
      } else {
        setPaymentStatus('pending');
      }
      
    } catch (error) {
      console.error('Error checking payment status:', error);
      setError('Unable to verify payment status');
      setPaymentStatus('error');
    }
  };

  const handleRetry = () => {
    if (referenceNumber) {
      checkPaymentStatus(referenceNumber);
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  if (paymentStatus === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we verify your payment status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {paymentStatus === 'success' && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
              
              {paymentDetails && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Reference:</span> {paymentDetails.reference_number}</p>
                    <p><span className="font-medium">Amount:</span> {paymentDetails.amount} {paymentDetails.currency}</p>
                    <p><span className="font-medium">Status:</span> {paymentDetails.status}</p>
                    {paymentDetails.paid_at && (
                      <p><span className="font-medium">Paid At:</span> {new Date(paymentDetails.paid_at).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              )}
              
              <Button onClick={handleGoHome} className="w-full bg-green-600 hover:bg-green-700">
                Return to Home
              </Button>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
              <p className="text-gray-600 mb-6">Your payment could not be processed. Please try again.</p>
              
              <div className="space-y-3">
                <Button onClick={handleRetry} className="w-full bg-blue-600 hover:bg-blue-700">
                  Try Again
                </Button>
                <Button onClick={handleGoHome} variant="outline" className="w-full">
                  Return to Home
                </Button>
              </div>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              
              <div className="space-y-3">
                <Button onClick={handleRetry} className="w-full bg-blue-600 hover:bg-blue-700">
                  Try Again
                </Button>
                <Button onClick={handleGoHome} variant="outline" className="w-full">
                  Return to Home
                </Button>
              </div>
            </div>
          )}

          {paymentStatus === 'pending' && (
            <div className="text-center">
              <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Pending</h2>
              <p className="text-gray-600 mb-6">Your payment is still being processed. Please wait...</p>
              
              <Button onClick={handleRetry} className="w-full bg-blue-600 hover:bg-blue-700">
                Check Status Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
