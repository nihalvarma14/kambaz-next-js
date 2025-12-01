import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '../../lib/session';

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('sessionId')?.value;

    if (sessionId) {
      deleteSession(sessionId);
    }

    const response = NextResponse.json({ message: 'Signed out successfully' });
    response.cookies.delete('sessionId');

    return response;
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}