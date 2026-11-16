import express from 'express';
import { store } from '../utils/storage.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Submit adoption application
router.post('/', protect, (req, res) => {
  try {
    const { petId, formData } = req.body;

    if (!petId || !formData) {
      return res.status(400).json({ message: 'Pet ID and application form details are required.' });
    }

    const pet = store.getPetById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Selected pet not found.' });
    }

    if (pet.adoptionStatus === 'adopted') {
      return res.status(400).json({ message: 'This pet has already been happily adopted.' });
    }

    // Enforce one active adoption request per pet from this adopter
    const existing = store.getApplications().find(
      app => app.petId === petId &&
      app.adopterId === req.user._id &&
      !['rejected', 'cancelled'].includes(app.status)
    );

    if (existing) {
      return res.status(400).json({
        message: 'You already have an active adoption application for this pet.'
      });
    }

    const newApp = store.createApplication({
      petId,
      petName: pet.name,
      petImage: pet.images && pet.images[0] ? pet.images[0] : '',
      adopterId: req.user._id,
      adopterName: req.user.name,
      adopterEmail: req.user.email,
      adopterPhone: req.user.phone || formData.phone,
      ngoId: pet.ngoId,
      status: 'submitted',
      formData: {
        fullName: formData.fullName || req.user.name,
        age: formData.age || '',
        phone: formData.phone || req.user.phone,
        email: formData.email || req.user.email,
        address: formData.address || req.user.address,
        occupation: formData.occupation || '',
        residenceType: formData.residenceType || 'Apartment',
        hasFencedYard: formData.hasFencedYard || 'No',
        familyMembersCount: formData.familyMembersCount || 1,
        allFamilyAgreed: formData.allFamilyAgreed || 'Yes',
        otherPets: formData.otherPets || 'None',
        petExperience: formData.petExperience || 'Beginner',
        hoursPetAloneDaily: formData.hoursPetAloneDaily || '2-4 hours',
        carePlan: formData.carePlan || '',
        reasonForAdoption: formData.reasonForAdoption || ''
      },
      timeline: [
        {
          stage: 'submitted',
          timestamp: new Date().toISOString(),
          note: 'Adoption application submitted by adopter'
        }
      ]
    });

    return res.status(201).json({
      message: 'Application submitted successfully! The shelter will review your details.',
      application: newApp
    });
  } catch (error) {
    console.error('Submit application error:', error);
    return res.status(500).json({ message: 'Error submitting adoption application.' });
  }
});

// Get current adopter's applications
router.get('/my', protect, (req, res) => {
  const apps = store.getApplicationsByAdopter(req.user._id);
  return res.json({ applications: apps });
});

// Get all applications for NGO's pets or platform admin
router.get('/ngo', protect, authorize('ngo', 'admin'), (req, res) => {
  let apps = store.getApplications();
  if (req.user.role === 'ngo') {
    // Filter pets belonging to this NGO
    const ngoPets = store.getPets().filter(p => p.ngoId === req.user._id).map(p => p._id);
    apps = apps.filter(a => ngoPets.includes(a.petId) || a.ngoId === req.user._id);
  }
  return res.json({ applications: apps });
});

// Update application status (NGO or Admin)
router.put('/:id/status', protect, authorize('ngo', 'admin'), (req, res) => {
  const { status, reviewNotes } = req.body;
  const app = store.getApplicationById(req.params.id);

  if (!app) {
    return res.status(404).json({ message: 'Application not found.' });
  }

  const validStatuses = ['submitted', 'under_review', 'home_check', 'approved', 'rejected', 'completed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  const currentTimeline = app.timeline || [];
  currentTimeline.push({
    stage: status,
    timestamp: new Date().toISOString(),
    note: reviewNotes || `Application updated to ${status}`
  });

  const updates = {
    status,
    reviewNotes: reviewNotes || app.reviewNotes,
    timeline: currentTimeline
  };

  // If approved or completed, update pet adoption status
  if (status === 'approved' || status === 'completed') {
    store.updatePet(app.petId, { adoptionStatus: 'adopted' });
    updates.certificateNumber = `CERT-PETLOVE-${Date.now().toString().slice(-6)}`;
    updates.adoptionDate = new Date().toISOString();
  } else if (status === 'under_review' || status === 'home_check') {
    store.updatePet(app.petId, { adoptionStatus: 'pending' });
  }

  const updatedApp = store.updateApplication(req.params.id, updates);
  return res.json({ message: `Application status updated to ${status}!`, application: updatedApp });
});

// Get adoption certificate data
router.get('/:id/certificate', protect, (req, res) => {
  const app = store.getApplicationById(req.params.id);
  if (!app) {
    return res.status(404).json({ message: 'Application not found.' });
  }

  if (app.status !== 'approved' && app.status !== 'completed') {
    return res.status(400).json({ message: 'Adoption certificate is only available for approved adoptions.' });
  }

  const pet = store.getPetById(app.petId);

  const certificate = {
    certificateId: app.certificateNumber || `CERT-${app._id.slice(-6).toUpperCase()}`,
    petName: app.petName,
    petBreed: pet ? pet.breed : 'Companion Pet',
    petImage: app.petImage,
    microchipId: pet ? pet.microchipId : 'MC-985141002348',
    adopterName: app.adopterName,
    adoptionDate: app.adoptionDate || app.updatedAt,
    ngoName: pet?.ngoName || 'Paws & Hope Animal Shelter',
    status: 'Official Lifetime Adoption Certificate',
    verifiedBadge: true
  };

  return res.json({ certificate });
});

export default router;
