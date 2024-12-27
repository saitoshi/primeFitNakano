import mongoose from 'mongoose';
import connectDB from '@/app/_utils/connectDB';
import { BlogModel } from '@/app/_utils/dataSchemas/blogSchema';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const route = (await params).id;
    const blogID = route.split('id=')[1];
    const _id = await new mongoose.Types.ObjectId(blogID);
    const blog = await BlogModel.findById(_id);

    return NextResponse.json(
      { message: 'blog list', blog: blog },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' }, { status: 501 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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
    const route = (await params).id;
    const blogID = route.split('id=')[1];
    const _id = await new mongoose.Types.ObjectId(blogID);

    const reqBody = await request.json();
    const today = new Date();
    const blog = await BlogModel.findByIdAndUpdate(_id, {
      title: reqBody.title,
      description: reqBody.description,
      keyword: reqBody.keyword,
      content: reqBody.content,
      thumbnail: reqBody.thumbnail,
      lastModified: today,
      author: reqBody.author,
      status: reqBody.status,
    });
    return NextResponse.json(
      { message: 'Updated Blog', blog: blog },
      { status: 201 },
    );
  } catch (error) {
    await console.error(error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
