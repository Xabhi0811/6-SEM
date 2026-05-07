import { Schema, model, Types } from 'mongoose';

export type UserRole = 'admin' | 'analyst' | 'viewer';

export interface UserDocument {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'analyst', 'viewer'], default: 'viewer' }
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', userSchema);
