import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

interface CourseDocument {
  _id: string;
  [key: string]: unknown;
}

// GET course by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await connectDB();
    const { courseId } = await params;
    const db = mongoose.connection.db;
    const collection = db?.collection<CourseDocument>('courses');
    const course = await collection?.findOne({ _id: courseId });
    
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update course
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await connectDB();
    const { courseId } = await params;
    const updates = await request.json();
    const db = mongoose.connection.db;
    
    const collection = db?.collection<CourseDocument>('courses');
    const result = await collection?.findOneAndUpdate(
      { _id: courseId },
      { $set: updates },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE course
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await connectDB();
    const { courseId } = await params;
    const db = mongoose.connection.db;
    
    const collection = db?.collection<CourseDocument>('courses');
    const result = await collection?.deleteOne({ _id: courseId });
    
    if (result?.deletedCount === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}