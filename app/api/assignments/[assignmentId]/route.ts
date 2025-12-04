import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

// GET assignment by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assignmentId: string }> }
) {
  try {
    await connectDB();
    const { assignmentId } = await params;
    const db = mongoose.connection.db;
    const collection = db?.collection('assignments');
    const assignment = await collection?.findOne({ _id: assignmentId } as never);
    
    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }
    return NextResponse.json(assignment);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update assignment
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ assignmentId: string }> }
) {
  try {
    await connectDB();
    const { assignmentId } = await params;
    const updates = await request.json();
    const db = mongoose.connection.db;
    
    const collection = db?.collection('assignments');
    const result = await collection?.findOneAndUpdate(
      { _id: assignmentId } as never,
      { $set: updates },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE assignment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ assignmentId: string }> }
) {
  try {
    await connectDB();
    const { assignmentId } = await params;
    const db = mongoose.connection.db;
    
    const collection = db?.collection('assignments');
    const result = await collection?.deleteOne({ _id: assignmentId } as never);
    
    if (result?.deletedCount === 0) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Assignment deleted successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}