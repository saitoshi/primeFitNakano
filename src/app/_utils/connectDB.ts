import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_API_KEY!);
  } catch (error) {
    console.log('Failure: Cannot connect to MongoDB' + error);
    throw new Error();
  }
};

export default connectDB;
