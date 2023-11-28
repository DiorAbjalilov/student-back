import mongoose, { Types } from 'mongoose';
export interface IComment extends mongoose.Document {
  text: string;
  owner: object;
  post_id: any;
  like: number;
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    text: {
      type: String,
      required: true
    },
    owner: {
      type: Object,
      ref: 'user',
      required: true
    },
    like: {
      type: Number,
      required: false
    },
    post_id: {
      type: Types.ObjectId,
      ref: 'post',
      required: true
    }
  },
  {
    timestamps: true
  }
);
const Comments = mongoose.model<IComment>('comments', commentSchema);
export default Comments;
