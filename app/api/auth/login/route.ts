import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password, userType } = await req.json();

    // Validate input
    if (!email || !password || !userType) {
      return NextResponse.json(
        { error: 'Email, password, and user type are required' },
        { status: 400 }
      );
    }

    // Validate user type
    if (!['tailor', 'customer'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connect();

    try {
      // Select collection based on user type
      const collection = userType === 'tailor' ? 'tailors' : 'customers';
      
      // Find user
      const user = await db.collection(collection).findOne({ 
        email: email.toLowerCase(),
        isActive: true 
      });

      // Generic error message for security
      const invalidCredentials = { 
        error: 'Invalid email or password',
        status: 401 
      };

      if (!user) {
        return NextResponse.json(
          invalidCredentials,
          { status: 401 }
        );
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          invalidCredentials,
          { status: 401 }
        );
      }

      // Update last login time
      await db.collection(collection).updateOne(
        { _id: user._id },
        { 
          $set: { 
            lastLogin: new Date(),
            updatedAt: new Date()
          } 
        }
      );

      // Remove sensitive data from response
      const { password: _, ...userWithoutPassword } = user;

      return NextResponse.json({
        message: 'Login successful',
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Database operation error:', error);
      throw error;
    }

  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Login failed. Please try again later.' },
      { status: 500 }
    );
  }
}
