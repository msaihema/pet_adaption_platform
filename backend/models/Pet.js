import mongoose from 'mongoose';

const petSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['dog', 'cat', 'other'], lowercase: true },
    breed: { type: String, required: true, trim: true },
    age: { type: String, required: true },
    ageGroup: { type: String, enum: ['puppy', 'young', 'adult', 'senior'], default: 'young', lowercase: true },
    gender: { type: String, required: true, enum: ['male', 'female'], lowercase: true },
    size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium', lowercase: true },
    location: { type: String, required: true, trim: true },
    healthStatus: { type: String, enum: ['healthy', 'special_needs', 'under_treatment'], default: 'healthy', lowercase: true },
    vaccinated: { type: Boolean, default: true },
    spayedNeutered: { type: Boolean, default: true },
    ngoVerified: { type: Boolean, default: true },
    adoptionStatus: { type: String, enum: ['available', 'pending', 'adopted'], default: 'available', lowercase: true },
    featured: { type: Boolean, default: false },
    images: { type: [String], default: [] },
    description: { type: String, default: '' },
    personality: { type: [String], default: [] },
    activityLevel: { type: String, enum: ['low', 'moderate', 'high'], default: 'moderate', lowercase: true },
    diet: { type: String, default: '' },
    medicalHistory: { type: String, default: '' },
    vaccinationRecords: [
      {
        vaccineName: String,
        dateAdministered: String,
        validUntil: String,
        vetName: String,
        batchNumber: String
      }
    ],
    dewormingRecords: [
      {
        medicine: String,
        dateAdministered: String,
        nextDueDate: String
      }
    ],
    vetInfo: {
      clinicName: { type: String, default: '' },
      doctorName: { type: String, default: '' },
      contact: { type: String, default: '' }
    },
    microchipId: { type: String, default: '' },
    ngoId: { type: String, default: '' },
    ngoName: { type: String, default: 'Paws & Hope Animal Shelter' }
  },
  { timestamps: true, _id: false }
);

export const Pet = mongoose.models.Pet || mongoose.model('Pet', petSchema);
export default Pet;
