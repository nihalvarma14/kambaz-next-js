import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const connectionString = 'mongodb://127.0.0.1:27017/kambaz';
    
    // Connect if not already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(connectionString);
    }
    
    // Get the users collection directly
    const db = mongoose.connection.db;
    const usersCollection = db?.collection('users');
    const users = await usersCollection?.find({}).limit(3).toArray();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully retrieved users from MongoDB',
      userCount: users?.length || 0,
      users: users
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}