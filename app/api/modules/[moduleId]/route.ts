import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

// GET module by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    await connectDB();
    const { moduleId } = await params;
    const db = mongoose.connection.db;
    const collection = db?.collection('modules') as any;
    const module = await collection.findOne({ _id: moduleId });
    
    if (!module) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }
    return NextResponse.json(module);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update module
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    await connectDB();
    const { moduleId } = await params;
    const updates = await request.json();
    const db = mongoose.connection.db;
    
    const collection = db?.collection('modules') as any;
    const result = await collection.findOneAndUpdate(
      { _id: moduleId },
      { $set: updates },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE module
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    await connectDB();
    const { moduleId } = await params;
    const db = mongoose.connection.db;
    
    const collection = db?.collection('modules') as any;
    const result = await collection.deleteOne({ _id: moduleId });
    
    if (result?.deletedCount === 0) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Module deleted successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}