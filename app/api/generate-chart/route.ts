import { NextRequest, NextResponse } from 'next/server';
import { VedicCalculator } from '@/lib/astrology/calculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, dateOfBirth, timeOfBirth, placeOfBirth, latitude, longitude, timezone, gender } = body;

    if (!dateOfBirth || !placeOfBirth) {
      return NextResponse.json({ error: 'Date and place of birth are required' }, { status: 400 });
    }

    const birthDate = new Date(dateOfBirth);
    const [hours, minutes] = (timeOfBirth || '12:00').split(':').map(Number);
    const lat = latitude || 28.6139; // Default Delhi
    const lng = longitude || 77.2090;
    const tz = timezone || 5.5; // IST

    const calculator = new VedicCalculator();
    const chartData = calculator.calculateChart(
      birthDate,
      hours || 12,
      minutes || 0,
      0,
      lat,
      lng,
      tz,
      placeOfBirth
    );

    const chartId = `chart_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({
      success: true,
      chartId,
      chart: {
        ...chartData,
        id: chartId,
        name: name || 'User',
        gender: gender || 'other',
        birthDate: birthDate.toISOString(),
        timeOfBirth: timeOfBirth || '12:00',
        placeOfBirth,
      },
    });
  } catch (error: any) {
    console.error('Chart generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate chart', details: error.message },
      { status: 500 }
    );
  }
}
