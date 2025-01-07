import connectDB from '@/app/_utils/connectDB';
import { LocationModel } from '@/app/_utils/dataSchemas/locationSchema';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * @route /api/location
 * @method GET
 * @desc Gets the all of the registered locations
 * @returns locations - a collection of the registered locations
 */
export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const locationMap = await LocationModel.find();
    return NextResponse.json(
      { status: 201, message: '店舗情報', locations: locationMap },
      { status: 201 },
    );
  } catch (error) {
    await console.error(error);
    return NextResponse.json({ status: 500, message: 'サーバーサイドエラー' });
  }
}

/**
 * @route /api/location
 * @method POST
 * @desc Registers a new location based on the provided info
 * @return Success or Error
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    let token = await request.headers.get('Authorization');
    if (!token) {
      return NextResponse.json(
        { status: 403, message: 'Error: No Token Was Received' },
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
    await connectDB();
    const reqBody = await request.json();
    const location = await LocationModel.create({
      name: reqBody.name,
      address: reqBody.address,
      hours: reqBody.hours,
      phoneNumber: reqBody.phoneNumber,
      access: reqBody.access,
      description: reqBody.description,
    });

    return NextResponse.json(
      { status: 201, message: '店舗追加いたしました.', location: location },
      { status: 201 },
    );
  } catch (error) {
    await console.error(error);
    return NextResponse.json({ status: 500, message: 'サーバーサイドエラー' });
  }
}
