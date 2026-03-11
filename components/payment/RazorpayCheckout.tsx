'use client';

import React, { useEffect, useState } from 'react';

interface RazorpayCheckoutProps {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  description: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
  buttonLabel?: string;
  isLoading?: boolean;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({
  orderId,
  amount,
  currency,
  keyId,
  description,
  onSuccess,
  onError,
  buttonLabel = 'Complete Payment',
  isLoading = false,
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      onError?.('Failed to load payment gateway');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [onError]);

  const handlePayment = async () => {
    if (!scriptLoaded || isProcessing || isLoading) return;

    setIsProcessing(true);

    try {
      if (!window.Razorpay) {
        throw new Error('Razorpay not loaded');
      }

      const options = {
        key: keyId,
        amount: amount * 100, // Convert to paise
        currency: currency,
        name: 'AstroBhavishya',
        description: description,
        image: '/logo.png', // Add your logo
        order_id: orderId,
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpayOrderId: orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            onSuccess?.(response.razorpay_payment_id);
          } catch (error) {
            console.error('Payment verification error:', error);
            onError?.('Payment verification failed');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          orderId: orderId,
        },
        theme: {
          color: '#d4a574',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response: any) => {
        console.error('Payment failed:', response.error);
        onError?.(response.error.description || 'Payment failed');
        setIsProcessing(false);
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      onError?.((error as Error).message || 'Payment error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!scriptLoaded || isProcessing || isLoading}
      className="w-full py-3 px-4 bg-gradient-to-r from-[#d4a574] to-[#c9915c] text-[#0a0a1a] font-bold rounded-lg hover:shadow-lg hover:shadow-[#d4a574]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
    >
      {isProcessing || isLoading ? (
        <>
          <div className="animate-spin">⚡</div>
          Processing...
        </>
      ) : (
        <>
          <span>💳</span>
          {buttonLabel}
        </>
      )}
    </button>
  );
};
