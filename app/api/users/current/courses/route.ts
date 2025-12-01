import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getSession } from '../../../lib/session';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

// GET current user's courses
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('sessionId')?.value;
    if (!sessionId) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const user = getSession(sessionId);
    if (!user) {
      return NextResponse.json({ message: 'Session expired' }, { status: 401 });
    }

    await connectDB();
    const db = mongoose.connection.db;

    // Get user's enrollments
    const enrollmentsCollection = db?.collection('enrollments') as any;
    const enrollments = await enrollmentsCollection.find({ user: user._id }).toArray();

    // Get course IDs from enrollments
    const courseIds = enrollments.map((e: any) => e.course);

    // Get courses
    const coursesCollection = db?.collection('courses') as any;
    const courses = await coursesCollection.find({ _id: { $in: courseIds } }).toArray();

    return NextResponse.json(courses);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST create new course for current user
export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('sessionId')?.value;
    if (!sessionId) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const user = getSession(sessionId);
    if (!user) {
      return NextResponse.json({ message: 'Session expired' }, { status: 401 });
    }

    await connectDB();
    const course = await request.json();

    // Generate new course ID
    course._id = new Date().getTime().toString();

    const db = mongoose.connection.db;
    const coursesCollection = db?.collection('courses') as any;
    await coursesCollection.insertOne(course);

    // Auto-enroll the user in the course
    const enrollmentsCollection = db?.collection('enrollments') as any;
    await enrollmentsCollection.insertOne({
      _id: `${user._id}-${course._id}`,
      user: user._id,
      course: course._id,
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
