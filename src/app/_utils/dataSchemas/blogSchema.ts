import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  keyword: { type: [], required: true },
  content: { type: [], required: true },
  thumbnail: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  lastModified: { type: Date, required: true },
  author: { type: String, required: true },
  status: {
    type: String,
    enum: ['draft', 'released', 'private'],
    required: true,
  },
});

export const BlogModel =
  mongoose.models.Blog || mongoose.model('Blog', blogSchema);
