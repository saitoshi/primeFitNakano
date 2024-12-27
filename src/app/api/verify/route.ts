import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    let token = request.headers.get('Authorization');

    if (!token) {
      return NextResponse.json(
        { message: 'Error No Token was received', status: 403 },
        { status: 403 },
      );
    }
    token = await token.split(' ')[1];
    const secretKey = process.env.SESSION_SECRET as string;

    const decoded = await jwt.verify(token, secretKey);
    if (!decoded) {
      return NextResponse.json({
        message: 'verification error',
        statu: 403,
      });
    }
    return NextResponse.json(
      { status: 201, message: 'Token Validated' },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Server Error' }, { status: 501 });
  }
}
