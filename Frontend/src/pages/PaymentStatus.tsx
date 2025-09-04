import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { paymentService } from '@/services/paymentService';

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<string>('checking');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [showPopup, setShowPopup] = useState(true);

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
      
      // First, try a quick status check
      const status = await paymentService.getPaymentStatus(refNumber);
      console.log('Payment status received:', status);
      
      setPaymentDetails(status);
      
      if (status.status === 'completed') {
        setPaymentStatus('success');
      } else if (status.status === 'failed') {
        setPaymentStatus('failed');
      } else if (status.status === 'pending') {
        // For pending payments, try polling for a few attempts
        setPaymentStatus('pending');
        await pollForStatusUpdate(refNumber);
      } else {
        setPaymentStatus('pending');
      }
      
    } catch (error) {
      console.error('Error checking payment status:', error);
      setError('Unable to verify payment status');
      setPaymentStatus('error');
    }
  };

  const pollForStatusUpdate = async (refNumber: string, maxAttempts = 5) => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        console.log(`Polling attempt ${attempt + 1} for payment status...`);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
        
        const status = await paymentService.getPaymentStatus(refNumber);
        console.log(`Attempt ${attempt + 1} - Status:`, status);
        
        if (status.status === 'completed') {
          setPaymentStatus('success');
          setPaymentDetails(status);
          return;
        } else if (status.status === 'failed') {
          setPaymentStatus('failed');
          setPaymentDetails(status);
          return;
        }
      } catch (error) {
        console.error(`Polling attempt ${attempt + 1} failed:`, error);
      }
    }
    
    // If still pending after all attempts, show a message
    console.log('Payment still pending after polling attempts');
  };

  const handleRetry = () => {
    if (referenceNumber) {
      checkPaymentStatus(referenceNumber);
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Redirect to home after closing popup
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />;
      case 'failed':
        return <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />;
      case 'error':
        return <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />;
      case 'pending':
        return <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />;
      default:
        return <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />;
    }
  };

  const getStatusTitle = () => {
    switch (paymentStatus) {
      case 'success':
        return 'Payment Successful! 🎉';
      case 'failed':
        return 'Payment Failed ❌';
      case 'error':
        return 'Error Occurred ⚠️';
      case 'pending':
        return 'Payment Pending ⏳';
      default:
        return 'Checking Payment Status...';
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'success':
        return 'Your payment has been processed successfully!';
      case 'failed':
        return 'Your payment could not be processed. Please try again.';
      case 'error':
        return error || 'An error occurred while checking payment status.';
      case 'pending':
        return 'Your payment is still being processed. Please wait...';
      default:
        return 'Please wait while we verify your payment status...';
    }
  };

  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'pending':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  if (!showPopup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={`bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto animate-in slide-in-from-bottom-4 duration-300 ${getStatusColor()}`}>
        <div className="p-8">
          {getStatusIcon()}
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            {getStatusTitle()}
          </h2>
          
          <p className="text-gray-600 mb-6 text-center">
            {getStatusMessage()}
          </p>
          
          {paymentDetails && (
            <div className="bg-white rounded-lg p-4 mb-6 border">
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
          
          <div className="space-y-3">
            {paymentStatus === 'success' && (
              <Button onClick={handleClosePopup} className="w-full bg-green-600 hover:bg-green-700">
                Return to Home
              </Button>
            )}
            
            {paymentStatus === 'failed' && (
              <>
                <Button onClick={handleRetry} className="w-full bg-blue-600 hover:bg-blue-700">
                  Try Again
                </Button>
                <Button onClick={handleClosePopup} variant="outline" className="w-full">
                  Return to Home
                </Button>
              </>
            )}
            
            {paymentStatus === 'error' && (
              <>
                <Button onClick={handleRetry} className="w-full bg-blue-600 hover:bg-blue-700">
                  Try Again
                </Button>
                <Button onClick={handleClosePopup} variant="outline" className="w-full">
                  Return to Home
                </Button>
              </>
            )}
            
            {paymentStatus === 'pending' && (
              <>
                <Button onClick={handleRetry} className="w-full bg-blue-600 hover:bg-blue-700">
                  Check Status Again
                </Button>
                <Button onClick={handleClosePopup} variant="outline" className="w-full">
                  Return to Home
                </Button>
              </>
            )}
            
            {paymentStatus === 'checking' && (
              <Button onClick={handleClosePopup} variant="outline" className="w-full">
                Return to Home
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
