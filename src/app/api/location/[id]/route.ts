import connectDB from '@/app/_utils/connectDB';
import mongoose from 'mongoose';
import { LocationModel } from '@/app/_utils/dataSchemas/locationSchema';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * @route /api/location:id
 * @method GET
 * @param id - the location id
 * @desc Gets the location by the specific id provided in the parameter
 * @return location info or error
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const route = (await params).id;
    const locationID = route.split('id=')[1];
    const _id = await new mongoose.Types.ObjectId(locationID);
    const location = await LocationModel.findById(_id);
    if (!location) {
      return NextResponse.json(
        {
          status: 404,
          message: '店舗登録されていません',
        },
        { status: 404 },
      );
    }
    return NextResponse.json({
      status: 201,
      location: location,
      message: '店舗情報',
    });
  } catch (error) {
    await console.error(error);
    return NextResponse.json({ status: 500, message: 'サーバーサイドエラー' });
  }
}

/**
 * @route /api/location/id={locationID}
 * @method PUT
 * @desc Updates the existing location by the specific id provided in the parameter
 * @return new location info or error
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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
    const route = (await params).id;
    const locationID = route.split('id=')[1];
    const _id = await new mongoose.Types.ObjectId(locationID);
    const location = await LocationModel.findByIdAndUpdate(_id, {
      name: reqBody.name,
      address: reqBody.address,
      hours: reqBody.hours,
      phoneNumber: reqBody.phoneNumber,
      access: reqBody.access,
      description: reqBody.description,
    });
    if (!location) {
      return NextResponse.json(
        {
          status: 404,
          message: '店舗登録されていません',
        },
        { status: 404 },
      );
    }
    return NextResponse.json({
      status: 201,
      location: location,
      message: '店舗情報更新いたしました',
    });
  } catch (error) {
    await console.error(error);
    return NextResponse.json({
      status: 500,
      message: 'サーバーサイドエラー',
    });
  }
}
