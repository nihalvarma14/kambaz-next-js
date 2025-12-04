import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

interface UserDocument {
  _id: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const connectionString = 'mongodb://127.0.0.1:27017/kambaz';
    
    // Connect if not already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(connectionString);
    }
    
    // Get the users collection directly
    const db = mongoose.connection.db;
    const usersCollection = db?.collection<UserDocument>('users');
    const users = await usersCollection?.find({}).limit(3).toArray();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully retrieved users from MongoDB',
      userCount: users?.length || 0,
      users: users
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ 
      success: false, 
      error: err.message,
      stack: err.stack
    }, { status: 500 });
  }
}