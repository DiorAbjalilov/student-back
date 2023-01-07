import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  address: string;
  birthDay: Date;
  sex: string;
  avatar: string;
}
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    address: {
      type: String
    },
    birthDay: {
      type: Date
    },
    sex: {
      type: String,
      enum: ['male', 'female']
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// bcrypt is password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// export
const User = mongoose.model<IUser>('user', userSchema);
export default User;
