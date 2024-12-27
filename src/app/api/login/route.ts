import connectDB from '@/app/_utils/connectDB';
import { UserModel } from '@/app/_utils/dataSchemas/userSchema';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @name /api/login
 * @method POST
 * @param request
 * @desc The route to send in login cred for login purposes.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // do something
  try {
    await connectDB();
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { message: 'user not found', status: 404 },
        { status: 404 },
      );
    }
    const isSamePwd = await bcrypt.compare(password, user.password);
    if (!isSamePwd) {
      return NextResponse.json(
        { status: '405', message: 'Password Does Not Match' },
        { status: 405 },
      );
    }

    const secretKey = process.env.SESSION_SECRET as string;
    const token = jwt.sign({ user }, secretKey, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return NextResponse.json(
      { status: 200, email: email, token: token },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
