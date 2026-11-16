import express from 'express';
import { store } from '../utils/storage.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Upload pet image
router.post('/upload-image', protect, authorize('ngo', 'admin'), upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  return res.json({ url: fileUrl });
});

// Get all pets with advanced filtering
router.get('/', (req, res) => {
  try {
    let pets = store.getPets();
    const {
      category,
      breed,
      ageGroup,
      gender,
      location,
      healthStatus,
      vaccinated,
      keyword,
      featured,
      adoptionStatus
    } = req.query;

    // Requirement 10: Ensure adopted pets no longer appear as available by default
    if (adoptionStatus && adoptionStatus !== 'all') {
      pets = pets.filter(p => (p.adoptionStatus || 'available').toLowerCase() === adoptionStatus.toLowerCase());
    } else if (!adoptionStatus) {
      // Default to only available pets for public discovery
      pets = pets.filter(p => (p.adoptionStatus || 'available').toLowerCase() === 'available');
    }

    if (category && category !== 'all' && category.trim() !== '') {
      pets = pets.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase().trim());
    }

    if (breed && breed !== 'all' && breed.trim() !== '') {
      const breedTerm = breed.toLowerCase().trim();
      pets = pets.filter(p => p.breed && p.breed.toLowerCase().includes(breedTerm));
    }

    if (ageGroup && ageGroup !== 'all' && ageGroup.trim() !== '') {
      pets = pets.filter(p => p.ageGroup && p.ageGroup.toLowerCase() === ageGroup.toLowerCase().trim());
    }

    if (gender && gender !== 'all' && gender.trim() !== '') {
      pets = pets.filter(p => p.gender && p.gender.toLowerCase() === gender.toLowerCase().trim());
    }

    if (location && location !== 'all' && location.trim() !== '') {
      const locTerm = location.toLowerCase().trim();
      pets = pets.filter(p => p.location && p.location.toLowerCase().includes(locTerm));
    }

    if (healthStatus && healthStatus !== 'all' && healthStatus.trim() !== '') {
      pets = pets.filter(p => p.healthStatus && p.healthStatus.toLowerCase() === healthStatus.toLowerCase().trim());
    }

    if (vaccinated !== undefined && vaccinated !== '' && vaccinated !== 'all') {
      const isVaccinated = vaccinated === 'true' || vaccinated === true;
      pets = pets.filter(p => Boolean(p.vaccinated) === isVaccinated);
    }

    if (featured === 'true' || featured === true) {
      pets = pets.filter(p => p.featured === true);
    }

    if (keyword && keyword.trim() !== '') {
      const kw = keyword.toLowerCase().trim();
      pets = pets.filter(p =>
        (p.name && p.name.toLowerCase().includes(kw)) ||
        (p.breed && p.breed.toLowerCase().includes(kw)) ||
        (p.location && p.location.toLowerCase().includes(kw)) ||
        (p.category && p.category.toLowerCase().includes(kw)) ||
        (p.description && p.description.toLowerCase().includes(kw)) ||
        (p.personality && p.personality.some(trait => trait.toLowerCase().includes(kw)))
      );
    }

    return res.json({ pets, total: pets.length });
  } catch (error) {
    console.error('Error fetching pets:', error);
    return res.status(500).json({ message: 'Server error while fetching pets.' });
  }
});

// Get single pet by ID
router.get('/:id', (req, res) => {
  const pet = store.getPetById(req.params.id);
  if (!pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }
  return res.json({ pet });
});

// Create new pet (NGO or Admin) - Requirement 9: Newly added NGO pets appear in public listing
router.post('/', protect, authorize('ngo', 'admin'), (req, res) => {
  try {
    const {
      name, category, breed, age, ageGroup, gender, size,
      location, healthStatus, vaccinated, spayedNeutered,
      description, personality, activityLevel, diet,
      medicalHistory, vaccinationRecords, dewormingRecords,
      vetInfo, microchipId, images, featured
    } = req.body;

    if (!name || !category || !breed || !location) {
      return res.status(400).json({ message: 'Name, category, breed, and location are required.' });
    }

    const newPet = store.createPet({
      name,
      category: (category || 'dog').toLowerCase(),
      breed,
      age: age || '1 Year',
      ageGroup: (ageGroup || 'young').toLowerCase(),
      gender: (gender || 'male').toLowerCase(),
      size: (size || 'medium').toLowerCase(),
      location,
      healthStatus: (healthStatus || 'healthy').toLowerCase(),
      vaccinated: vaccinated !== undefined ? Boolean(vaccinated) : true,
      spayedNeutered: spayedNeutered !== undefined ? Boolean(spayedNeutered) : true,
      ngoVerified: true,
      adoptionStatus: 'available', // Newly created pets are available by default!
      featured: Boolean(featured),
      images: images && images.length ? images : [
        'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1000&q=80'
      ],
      description: description || 'Friendly pet waiting for a loving family.',
      personality: Array.isArray(personality) ? personality : (personality ? personality.split(',').map(s => s.trim()) : ['Friendly', 'Gentle']),
      activityLevel: (activityLevel || 'moderate').toLowerCase(),
      diet: diet || 'Standard nutritious pet diet.',
      medicalHistory: medicalHistory || 'Standard vet health screening completed.',
      vaccinationRecords: vaccinationRecords || [],
      dewormingRecords: dewormingRecords || [],
      vetInfo: vetInfo || {
        clinicName: req.user.ngoDetails?.organizationName || 'Paws & Hope Animal Shelter',
        doctorName: 'Dr. Ramesh Varma',
        contact: req.user.phone || '+91 94401 99882'
      },
      microchipId: microchipId || `MC-${Date.now().toString().slice(-8)}`,
      ngoId: req.user._id,
      ngoName: req.user.ngoDetails?.organizationName || req.user.name
    });

    return res.status(201).json({ message: 'Pet created successfully!', pet: newPet });
  } catch (error) {
    console.error('Create pet error:', error);
    return res.status(500).json({ message: 'Error creating pet.' });
  }
});

// Update pet
router.put('/:id', protect, authorize('ngo', 'admin'), (req, res) => {
  const pet = store.getPetById(req.params.id);
  if (!pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }

  // Ensure NGO owns this pet or user is admin
  if (req.user.role !== 'admin' && pet.ngoId !== req.user._id) {
    return res.status(403).json({ message: 'Unauthorized to modify this pet profile.' });
  }

  const updatedPet = store.updatePet(req.params.id, req.body);
  return res.json({ message: 'Pet updated successfully!', pet: updatedPet });
});

// Delete pet
router.delete('/:id', protect, authorize('ngo', 'admin'), (req, res) => {
  const pet = store.getPetById(req.params.id);
  if (!pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }

  if (req.user.role !== 'admin' && pet.ngoId !== req.user._id) {
    return res.status(403).json({ message: 'Unauthorized to delete this pet profile.' });
  }

  store.deletePet(req.params.id);
  return res.json({ message: 'Pet deleted successfully.' });
});

// Add vaccination record to health passport
router.post('/:id/vaccinations', protect, authorize('ngo', 'admin'), (req, res) => {
  const pet = store.getPetById(req.params.id);
  if (!pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }

  const { vaccineName, dateAdministered, validUntil, vetName, batchNumber } = req.body;
  if (!vaccineName || !dateAdministered) {
    return res.status(400).json({ message: 'Vaccine name and date administered are required.' });
  }

  const currentRecords = pet.vaccinationRecords || [];
  currentRecords.push({
    vaccineName,
    dateAdministered,
    validUntil: validUntil || '',
    vetName: vetName || 'Dr. Ramesh Varma',
    batchNumber: batchNumber || `VAC-${Date.now().toString().slice(-4)}`
  });

  const updatedPet = store.updatePet(req.params.id, {
    vaccinationRecords: currentRecords,
    vaccinated: true
  });

  return res.json({ message: 'Vaccination record added to Pet Passport!', pet: updatedPet });
});

export default router;
