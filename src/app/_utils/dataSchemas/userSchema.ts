import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'owner',
    enum: ['owner', 'writer', 'viewer'],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  lastLoggedIn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model('User', userSchema);
