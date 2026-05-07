import { Schema, model, Types } from 'mongoose';

export interface DatasetDocument {
  _id: Types.ObjectId;
  name: string;
  fileName: string;
  mimeType: string;
  size: number;
  rowCount: number;
  status: 'processing' | 'ready' | 'failed';
  uploadedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const datasetSchema = new Schema<DatasetDocument>(
  {
    name: { type: String, required: true },
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    rowCount: { type: Number, default: 0 },
    status: { type: String, enum: ['processing', 'ready', 'failed'], default: 'processing' },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const DatasetModel = model<DatasetDocument>('Dataset', datasetSchema);
