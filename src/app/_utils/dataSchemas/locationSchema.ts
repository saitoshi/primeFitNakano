import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export const LocationModel =
  mongoose.models.Location || mongoose.model('Location', locationSchema);
