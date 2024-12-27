import connectDB from '@/app/_utils/connectDB';
import { BlogModel } from '@/app/_utils/dataSchemas/blogSchema';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const blogMap = await BlogModel.find();
    return NextResponse.json(
      { message: 'blog list', blogs: blogMap },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' }, { status: 501 });
  }
}

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

    const reqBody = await request.json();

    const today = new Date();
    const blog = await BlogModel.create({
      title: reqBody.title,
      description: reqBody.description,
      keyword: reqBody.keyword,
      content: reqBody.content,
      thumbnail: reqBody.thumbnail,
      publishedDate: today,
      lastModified: today,
      author: reqBody.author,
      status: reqBody.status,
    });

    return NextResponse.json(
      { message: 'Created Blog', blog: blog },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
