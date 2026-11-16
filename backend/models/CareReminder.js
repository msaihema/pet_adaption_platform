import mongoose from 'mongoose';

const careReminderSchema = new mongoose.Schema(
  {
    _id: { type: String },
    petId: { type: String, default: null },
    adopterId: { type: String, required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['vaccination', 'deworming', 'grooming', 'medication', 'vet_visit', 'diet'],
      default: 'vaccination'
    },
    dueDate: { type: String, required: true },
    time: { type: String, default: '09:00 AM' },
    frequency: { type: String, default: 'once' },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    completedAt: { type: Date },
    notes: { type: String, default: '' }
  },
  { timestamps: true, _id: false }
);

export const CareReminder = mongoose.models.CareReminder || mongoose.model('CareReminder', careReminderSchema);
export default CareReminder;
