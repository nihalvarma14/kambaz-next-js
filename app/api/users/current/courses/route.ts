import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getSession } from '../../../lib/session';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb://127.0.0.1:27017/kambaz');
  }
}

interface CourseDocument {
  _id: string;
  [key: string]: unknown;
}

interface EnrollmentDocument {
  _id: string;
  user: string;
  course: string;
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

    const enrollmentsCollection = db?.collection<EnrollmentDocument>('enrollments');
    const enrollments = await enrollmentsCollection?.find({ user: user._id }).toArray();

    const courseIds = enrollments?.map((e) => e.course) || [];

    const coursesCollection = db?.collection<CourseDocument>('courses');
    const courses = await coursesCollection?.find({ _id: { $in: courseIds } }).toArray();

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

    const courseId = new Date().getTime().toString();
    course._id = courseId;

    const db = mongoose.connection.db;
    const coursesCollection = db?.collection<CourseDocument>('courses');
    await coursesCollection?.insertOne(course as CourseDocument);

    const enrollmentsCollection = db?.collection<EnrollmentDocument>('enrollments');
    const enrollmentDoc: EnrollmentDocument = {
      _id: `${user._id}-${courseId}`,
      user: user._id,
      course: courseId,
    };
    await enrollmentsCollection?.insertOne(enrollmentDoc);

    return NextResponse.json(course, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}