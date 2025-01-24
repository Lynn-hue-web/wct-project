import { NextRequest, NextResponse } from 'next/server';

interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export async function GET(request: NextRequest) {
  try {
    const appointments: Appointment[] = [];
    
    return NextResponse.json({ 
      success: true, 
      appointments 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch appointments' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as Appointment;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Appointment created successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create appointment' 
      },
      { status: 500 }
    );
  }
}