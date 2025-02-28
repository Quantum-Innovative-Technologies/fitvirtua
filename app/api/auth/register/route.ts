import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, userType } = await req.json();
    const { db } = await connect();

    // Select collection based on user type
    const collection = userType === 'tailor' ? 'tailors' : 'customers';
    
    // Check if user already exists
    const existingUser = await db.collection(collection).findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.collection(collection).insertOne({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: new Date(),
      userType
    });

    return NextResponse.json({
      message: 'User created successfully',
      userId: result.insertedId
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
