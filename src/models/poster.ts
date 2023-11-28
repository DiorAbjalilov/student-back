import mongoose from 'mongoose';
export interface IPoster extends mongoose.Document {
  title: string;
  text: string;
  photo: string;
  owner: object;
  likes: number;
  type: string;
  comments: number;
}

const posterSchema = new mongoose.Schema<IPoster>(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: false
    },
    owner: {
      type: Object,
      ref: 'user',
      required: true
    },
    likes: {
      type: Number
    },
    type: {
      type: String,
      enum: ['post', 'question'],
      required: true
    },
    comments: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const Posters = mongoose.model<IPoster>('posters', posterSchema);
export default Posters;
