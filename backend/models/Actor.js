import mongoose from 'mongoose';

const ActorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    photo: String,
    dateOfBirth: String,
    placeOfBirth: String,
    dateOfDeath: String,
    placeOfDeath: String,
    height: String,
    career: String,
    genres: String,
    styles: String,
    biography: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Actor', ActorSchema);
