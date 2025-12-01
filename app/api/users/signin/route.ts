import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { createSession } from '../../lib/session';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const credentials = await request.json();
    const { username, password } = credentials;

    const db = mongoose.connection.db;
    const collection = db?.collection('users') as any;
    const user = await collection.findOne({ username, password });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session
    const sessionId = createSession(user._id, {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });

    // Return user data with session cookie
    const response = NextResponse.json(user);
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}