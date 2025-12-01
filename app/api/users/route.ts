import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

// GET all users or filter by role/name
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    const collection = db?.collection('users') as any;

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const name = searchParams.get('name');

    let filter: any = {};

    // Filter by role
    if (role) {
      filter.role = role;
    }

    // Filter by name (case-insensitive partial match)
    if (name) {
      const regex = new RegExp(name, 'i'); // 'i' makes it case-insensitive
      filter.$or = [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } }
      ];
    }

    const users = await collection.find(filter).toArray();
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
    
    // Generate new user ID if not provided
    if (!user._id) {
      user._id = new Date().getTime().toString();
    }

    const db = mongoose.connection.db;
    const collection = db?.collection('users') as any;
    await collection.insertOne(user);
    
    return NextResponse.json(user, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}