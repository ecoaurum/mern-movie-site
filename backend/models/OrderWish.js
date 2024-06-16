import mongoose from 'mongoose';

const OrderWishSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('OrderWish', OrderWishSchema);
