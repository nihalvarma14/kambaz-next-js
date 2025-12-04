import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

// GET all assignments for a course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await connectDB();
    const { courseId } = await params;
    const db = mongoose.connection.db;
    const collection = db?.collection('assignments');
    const assignments = await collection?.find({ course: courseId }).toArray();
    return NextResponse.json(assignments);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST create new assignment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await connectDB();
    const { courseId } = await params;
    const assignment = await request.json();
    assignment.course = courseId;
    
    if (!assignment._id) {
      assignment._id = new Date().getTime().toString();
    }
    
    const db = mongoose.connection.db;
    const collection = db?.collection('assignments');
    await collection?.insertOne(assignment);
    
    return NextResponse.json(assignment, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}