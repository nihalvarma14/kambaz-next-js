import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { createSession } from '../../lib/session';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

interface UserDocument {
  _id: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const credentials = await request.json();
    const { username, password } = credentials;

    const db = mongoose.connection.db;
    const collection = db?.collection<UserDocument>('users');
    const user = await collection?.findOne({ username, password });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const sessionId = createSession(user._id as string, {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json(user);
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}