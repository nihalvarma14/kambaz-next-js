import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

interface ModuleDocument {
  _id: string;
  course: string;
  [key: string]: unknown;
}

// GET all modules for a course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await connectDB();
    const { courseId } = await params;
    const db = mongoose.connection.db;
    const collection = db?.collection<ModuleDocument>('modules');
    const modules = await collection?.find({ course: courseId }).toArray();
    return NextResponse.json(modules);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST create new module for a course
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await connectDB();
    const { courseId } = await params;
    const module = await request.json();
    
    // Set course ID and generate module ID
    module.course = courseId;
    if (!module._id) {
      module._id = new Date().getTime().toString();
    }

    const db = mongoose.connection.db;
    const collection = db?.collection<ModuleDocument>('modules');
    await collection?.insertOne(module as ModuleDocument);
    
    return NextResponse.json(module, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}