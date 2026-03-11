import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', description, reportType } = body;

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Valid amount required' }, { status: 400 });
    }

    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

    if (isDemoMode) {
      // In demo mode, simulate a successful order
      const orderId = `order_demo_${Date.now()}`;
      return NextResponse.json({
        success: true,
        order: {
          id: orderId,
          amount: amount * 100,
          currency,
          description,
          reportType,
        },
        key: 'rzp_test_demo',
        isDemoMode: true,
      });
    }

    // Real Razorpay integration
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId.includes('placeholder')) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 503 });
    }

    const orderData = {
      amount: amount * 100, // Razorpay expects paise
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: { reportType, description },
    };

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create Razorpay order');
    }

    const order = await response.json();

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      key: keyId,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order', details: error.message },
      { status: 500 }
    );
  }
}
