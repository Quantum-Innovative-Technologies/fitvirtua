import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, userType } = await req.json();

    // Validate input
    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connect();

    try {
      // Select collection based on user type
      const collection = userType === 'tailor' ? 'tailors' : 'customers';
      
      // Check if user already exists
      const existingUser = await db.collection(collection).findOne({ 
        email: email.toLowerCase() 
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user document
      const userDoc = {
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName,
        lastName,
        userType,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        lastLogin: null,
        profile: {
          phone: null,
          address: null,
          avatar: null,
          bio: null
        }
      };

      // Add tailor-specific fields
      if (userType === 'tailor') {
        Object.assign(userDoc, {
          shopName: null,
          specialties: [],
          experience: null,
          rating: 0,
          reviews: [],
          availability: {
            schedule: [],
            isAvailable: true
          }
        });
      }

      // Add customer-specific fields
      if (userType === 'customer') {
        Object.assign(userDoc, {
          measurements: {
            height: null,
            weight: null,
            chest: null,
            waist: null,
            hip: null,
            shoulder: null
          },
          preferences: {
            style: [],
            size: null,
            colors: []
          }
        });
      }

      // Insert user
      const result = await db.collection(collection).insertOne(userDoc);

      if (!result.acknowledged) {
        throw new Error('Failed to create user');
      }

      // Remove password from response
      const { password: _, ...userResponse } = userDoc;

      return NextResponse.json({
        message: 'Registration successful',
        user: userResponse
      });

    } catch (error) {
      console.error('Database operation error:', error);
      throw error;
    }

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Registration failed. Please try again later.' },
      { status: 500 }
    );
  }
}
