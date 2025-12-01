import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

// GET all courses
export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    const collection = db?.collection('courses') as any;
    const courses = await collection.find({}).toArray();
    return NextResponse.json(courses);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST create new course
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const course = await request.json();
    
    // Generate new course ID if not provided
    if (!course._id) {
      course._id = new Date().getTime().toString();
    }

    const db = mongoose.connection.db;
    const collection = db?.collection('courses') as any;
    await collection.insertOne(course);
    
    return NextResponse.json(course, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}