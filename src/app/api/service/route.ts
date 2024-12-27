import connectDB from '@/app/_utils/connectDB';
import { ServiceModel } from '@/app/_utils/dataSchemas/serviceSchema';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * @route api/service
 * @method GET
 * @desc Gets all of the service registered in the system
 * @return services
 */
export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const serviceList = await ServiceModel.find();
    return NextResponse.json(
      { message: 'Got All The Services', services: serviceList },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' }, { status: 501 });
  }
}

/**
 * @route api/service
 * @method POST
 * @desc Submits a new service
 * @returns Success or Fail
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
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
    const today = new Date();
    const serviceInputs = await request.json();
    const serviceAdded = await ServiceModel.create({
      title: serviceInputs.title,
      description: serviceInputs.description,
      thumbnail: serviceInputs.thumbnail,
      images: serviceInputs.images,
      steps: serviceInputs.steps,
      campaign: serviceInputs.campaign,
      benefits: serviceInputs.benefits,
      reviews: serviceInputs.reviews,
      status: serviceInputs.status,
      costs: serviceInputs.costs,
      publishedDate: today,
      lastModified: today,
    });

    return NextResponse.json(
      { status: 201, message: 'Service Created', service: serviceAdded },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Server Error' }, { status: 501 });
  }
}
