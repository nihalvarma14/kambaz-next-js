import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../lib/session';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('sessionId')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = getSession(sessionId);

    if (!user) {
      return NextResponse.json(
        { message: 'Session expired' },
        { status: 401 }
      );
    }

    return NextResponse.json(user);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}