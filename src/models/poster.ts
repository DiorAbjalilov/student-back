import mongoose, { Types } from 'mongoose';
export interface IPoster extends mongoose.Document {
  subject: string;
  description: string;
  photo: string;
  type: string;
  price: number;
  ownerId: Types.ObjectId;
}
const posterSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    photo: {
      type: String
      // required: true
    },
    type: {
      type: String,
      enum: ['Kelishiladi'],
      require: true
    },
    ownerId: {
      type: Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    timestamps: true
  }
);
const Posters = mongoose.model<IPoster>('posters', posterSchema);
export default Posters;
