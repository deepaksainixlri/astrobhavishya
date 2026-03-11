import { NextResponse } from 'next/server';
import { VedicCalculator } from '@/lib/astrology/calculator';
import { CompatibilityCalculator } from '@/lib/astrology/compatibility';

interface PersonInput {
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth: string; // HH:MM
  placeOfBirth: string;
  latitude?: number;
  longitude?: number;
}

interface CompatibilityRequest {
  person1: PersonInput;
  person2: PersonInput;
  gender1: 'M' | 'F';
  gender2: 'M' | 'F';
}

export async function POST(request: Request) {
  try {
    const body: CompatibilityRequest = await request.json();
    const { person1, person2, gender1, gender2 } = body;

    // Validate required fields
    if (!person1 || !person2) {
      return NextResponse.json(
        { error: 'Both person1 and person2 are required' },
        { status: 400 }
      );
    }

    if (!person1.dateOfBirth || !person1.placeOfBirth) {
      return NextResponse.json(
        { error: 'Date and place of birth are required for person 1' },
        { status: 400 }
      );
    }

    if (!person2.dateOfBirth || !person2.placeOfBirth) {
      return NextResponse.json(
        { error: 'Date and place of birth are required for person 2' },
        { status: 400 }
      );
    }

    if (!gender1 || !gender2) {
      return NextResponse.json(
        { error: 'Gender is required for both persons' },
        { status: 400 }
      );
    }

    // Parse birth details for person 1
    const birthDate1 = new Date(person1.dateOfBirth);
    const [hours1, minutes1] = (person1.timeOfBirth || '12:00').split(':').map(Number);
    const lat1 = person1.latitude || 28.6139; // Default: Delhi
    const lng1 = person1.longitude || 77.2090;

    // Parse birth details for person 2
    const birthDate2 = new Date(person2.dateOfBirth);
    const [hours2, minutes2] = (person2.timeOfBirth || '12:00').split(':').map(Number);
    const lat2 = person2.latitude || 28.6139;
    const lng2 = person2.longitude || 77.2090;

    const timezone = 5.5; // IST

    // Calculate birth charts
    const calculator = new VedicCalculator();

    const chart1 = calculator.calculateChart(
      birthDate1,
      hours1 || 12,
      minutes1 || 0,
      0,
      lat1,
      lng1,
      timezone,
      person1.placeOfBirth
    );

    const chart2 = calculator.calculateChart(
      birthDate2,
      hours2 || 12,
      minutes2 || 0,
      0,
      lat2,
      lng2,
      timezone,
      person2.placeOfBirth
    );

    // Calculate compatibility
    const compatibilityCalculator = new CompatibilityCalculator();
    const result = compatibilityCalculator.calculateCompatibility(
      chart1,
      chart2,
      gender1,
      gender2
    );

    return NextResponse.json({
      success: true,
      person1: person1.fullName,
      person2: person2.fullName,
      compatibility: result,
    });
  } catch (error: any) {
    console.error('Compatibility check error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate compatibility', details: error.message },
      { status: 500 }
    );
  }
}
