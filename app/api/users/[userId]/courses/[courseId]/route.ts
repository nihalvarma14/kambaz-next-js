import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

interface EnrollmentDocument {
  _id: string;
  user: string;
  course: string;
}

// POST - Enroll user in course
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; courseId: string }> }
) {
  try {
    await connectDB();
    const { userId, courseId } = await params;
    
    const db = mongoose.connection.db;
    const collection = db?.collection<EnrollmentDocument>('enrollments');
    
    // Check if already enrolled
    const existing = await collection?.findOne({ user: userId, course: courseId });
    if (existing) {
      return NextResponse.json({ message: 'Already enrolled' }, { status: 200 });
    }
    
    // Create enrollment
    const enrollment: EnrollmentDocument = {
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
    };
    
    await collection?.insertOne(enrollment);
    return NextResponse.json(enrollment, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE - Unenroll user from course
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; courseId: string }> }
) {
  try {
    await connectDB();
    const { userId, courseId } = await params;
    
    const db = mongoose.connection.db;
    const collection = db?.collection<EnrollmentDocument>('enrollments');
    
    const result = await collection?.deleteOne({ user: userId, course: courseId });
    
    if (result?.deletedCount === 0) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Unenrolled successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}