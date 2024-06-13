import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  avatarUrl: String,
});

export default mongoose.model('Comment', CommentSchema);
