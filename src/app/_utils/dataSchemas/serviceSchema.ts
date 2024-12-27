import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const serviceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  benefits: {
    type: [],
    required: true,
  },
  reviews: {
    type: [],
    required: true,
  },
  campaign: {
    type: [],
    required: true,
  },
  steps: { type: [], required: true },
  costs: { type: [], required: true },
  publishedDate: { type: Date, required: true },
  lastModified: { type: Date, required: true },
  status: {
    type: String,
    enum: ['draft', 'released', 'private'],
    required: true,
    default: 'draft',
  },
  images: {
    type: [],
    required: true,
  },
});

export const ServiceModel =
  mongoose.models.Service || mongoose.model('Service', serviceSchema);
