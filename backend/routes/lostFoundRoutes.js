import express from 'express';
import { store } from '../utils/storage.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Get all lost and found listings
router.get('/', (req, res) => {
  let listings = store.getLostPets();
  const { type, category } = req.query;

  if (type && type !== 'all') {
    listings = listings.filter(item => item.type === type);
  }
  if (category && category !== 'all') {
    listings = listings.filter(item => item.category === category);
  }

  return res.json({ listings });
});

// Report a lost or found pet
router.post('/', upload.single('image'), (req, res) => {
  try {
    const {
      type, title, category, breed, color, location,
      date, contactName, contactPhone, reward, description
    } = req.body;

    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    if (!title || !location || !contactPhone) {
      return res.status(400).json({ message: 'Title, location, and contact phone are required.' });
    }

    const newListing = store.createLostPet({
      type: type || 'lost',
      title,
      category: category || 'dog',
      breed: breed || 'Mixed',
      color: color || '',
      location,
      date: date || new Date().toISOString().split('T')[0],
      contactName: contactName || 'Concerned Guardian',
      contactPhone,
      reward: reward || '',
      image: imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
      description: description || '',
      status: 'active'
    });

    return res.status(201).json({
      message: 'Report created successfully! The community has been notified.',
      listing: newListing
    });
  } catch (error) {
    console.error('Error creating lost/found listing:', error);
    return res.status(500).json({ message: 'Error submitting report.' });
  }
});

// Update status (e.g. mark reunited)
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const item = store.updateLostPet(req.params.id, { status });
  if (!item) {
    return res.status(404).json({ message: 'Listing not found.' });
  }
  return res.json({ message: 'Status updated!', listing: item });
});

export default router;
