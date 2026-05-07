import { Schema, model, Types } from 'mongoose';

export interface AlertDocument {
  _id: Types.ObjectId;
  type: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const alertSchema = new Schema<AlertDocument>(
  {
    type: { type: String, enum: ['info', 'warning', 'critical'], default: 'info' },
    title: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

export const AlertModel = model<AlertDocument>('Alert', alertSchema);
