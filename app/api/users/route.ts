import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

interface UserFilter {
  role?: string;
  $or?: Array<{ firstName: { $regex: RegExp } } | { lastName: { $regex: RegExp } }>;
}

// GET all users or filter by role/name
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    const collection = db?.collection('users');

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const name = searchParams.get('name');

    const filter: UserFilter = {};

    if (role) {
      filter.role = role;
    }

    if (name) {
      const regex = new RegExp(name, 'i');
      filter.$or = [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } }
      ];
    }

    const users = await collection?.find(filter).toArray();
    return NextResponse.json(users);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST create new user
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const user = await request.json();
    
    if (!user._id) {
      user._id = new Date().getTime().toString();
    }

    const db = mongoose.connection.db;
    const collection = db?.collection('users');
    await collection?.insertOne(user);
    
    return NextResponse.json(user, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}