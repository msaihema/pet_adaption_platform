import express from 'express';
import { store } from '../utils/storage.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get reminders for logged-in user
router.get('/', protect, (req, res) => {
  const reminders = store.getRemindersByAdopter(req.user._id);
  return res.json({ reminders });
});

// Create care reminder
router.post('/', protect, (req, res) => {
  try {
    const { petId, title, type, dueDate, time, frequency, notes } = req.body;

    if (!title || !dueDate || !type) {
      return res.status(400).json({ message: 'Title, care type, and due date are required.' });
    }

    const newReminder = store.createReminder({
      petId: petId || null,
      adopterId: req.user._id,
      title,
      type, // 'vaccination' | 'deworming' | 'grooming' | 'medication' | 'vet_visit' | 'diet'
      dueDate,
      time: time || '09:00 AM',
      frequency: frequency || 'once',
      status: 'pending',
      notes: notes || ''
    });

    return res.status(201).json({
      message: 'Care reminder added successfully!',
      reminder: newReminder
    });
  } catch (error) {
    console.error('Create reminder error:', error);
    return res.status(500).json({ message: 'Error creating reminder.' });
  }
});

// Mark reminder as completed / update
router.put('/:id', protect, (req, res) => {
  const reminder = store.getReminders().find(r => r._id === req.params.id);
  if (!reminder) {
    return res.status(404).json({ message: 'Reminder not found.' });
  }

  if (reminder.adopterId !== req.user._id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized.' });
  }

  const { status, notes, dueDate, time } = req.body;
  const updates = {};
  if (status) {
    updates.status = status;
    if (status === 'completed') {
      updates.completedAt = new Date().toISOString();
    }
  }
  if (notes !== undefined) updates.notes = notes;
  if (dueDate) updates.dueDate = dueDate;
  if (time) updates.time = time;

  const updatedReminder = store.updateReminder(req.params.id, updates);
  return res.json({ message: 'Reminder updated!', reminder: updatedReminder });
});

// Delete reminder
router.delete('/:id', protect, (req, res) => {
  const reminder = store.getReminders().find(r => r._id === req.params.id);
  if (!reminder) {
    return res.status(404).json({ message: 'Reminder not found.' });
  }

  if (reminder.adopterId !== req.user._id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized.' });
  }

  store.deleteReminder(req.params.id);
  return res.json({ message: 'Reminder deleted.' });
});

export default router;
