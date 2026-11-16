import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['adopter', 'ngo', 'admin'], default: 'adopter' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    verificationStatus: {
      type: String,
      enum: ['unverified', 'pending', 'verified', 'rejected'],
      default: 'unverified'
    },
    verificationDocuments: {
      govtIdType: { type: String, default: '' },
      idNumber: { type: String, default: '' },
      govtIdUrl: { type: String, default: '' },
      addressProofUrl: { type: String, default: '' },
      submittedAt: { type: Date },
      reviewedAt: { type: Date },
      rejectionReason: { type: String, default: null }
    },
    ngoDetails: {
      organizationName: { type: String, default: '' },
      registrationNumber: { type: String, default: '' },
      website: { type: String, default: '' },
      description: { type: String, default: '' },
      verified: { type: Boolean, default: false }
    }
  },
  { timestamps: true, _id: false }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
