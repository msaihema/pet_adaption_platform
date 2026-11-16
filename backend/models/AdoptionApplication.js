import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    _id: { type: String },
    petId: { type: String, required: true },
    petName: { type: String, default: '' },
    petImage: { type: String, default: '' },
    adopterId: { type: String, required: true },
    adopterName: { type: String, required: true },
    adopterEmail: { type: String, required: true },
    adopterPhone: { type: String, default: '' },
    ngoId: { type: String, default: '' },
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'home_check', 'approved', 'rejected', 'completed', 'cancelled'],
      default: 'submitted'
    },
    formData: {
      fullName: String,
      age: String,
      phone: String,
      email: String,
      address: String,
      occupation: String,
      residenceType: String,
      hasFencedYard: String,
      familyMembersCount: String,
      allFamilyAgreed: String,
      otherPets: String,
      petExperience: String,
      hoursPetAloneDaily: String,
      carePlan: String,
      reasonForAdoption: String
    },
    reviewNotes: { type: String, default: '' },
    timeline: [
      {
        stage: String,
        timestamp: { type: Date, default: Date.now },
        note: String
      }
    ],
    certificateNumber: { type: String, default: '' },
    adoptionDate: { type: Date }
  },
  { timestamps: true, _id: false }
);

export const AdoptionApplication = mongoose.models.AdoptionApplication || mongoose.model('AdoptionApplication', applicationSchema);
export default AdoptionApplication;
