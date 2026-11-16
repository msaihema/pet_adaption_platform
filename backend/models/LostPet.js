import mongoose from 'mongoose';

const lostPetSchema = new mongoose.Schema(
  {
    _id: { type: String },
    type: { type: String, enum: ['lost', 'found'], default: 'lost' },
    title: { type: String, required: true },
    category: { type: String, enum: ['dog', 'cat', 'other'], default: 'dog' },
    breed: { type: String, default: 'Mixed' },
    color: { type: String, default: '' },
    location: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    contactName: { type: String, required: true },
    contactPhone: { type: String, required: true },
    reward: { type: String, default: '' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    status: { type: String, enum: ['active', 'reunited'], default: 'active' }
  },
  { timestamps: true, _id: false }
);

export const LostPet = mongoose.models.LostPet || mongoose.model('LostPet', lostPetSchema);
export default LostPet;
