import express from 'express';
import { store } from '../utils/storage.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get admin dashboard stats and summaries
router.get('/stats', protect, authorize('admin'), (req, res) => {
  const users = store.getUsers();
  const pets = store.getPets();
  const applications = store.getApplications();

  const totalUsers = users.filter(u => u.role === 'adopter').length;
  const totalNgos = users.filter(u => u.role === 'ngo').length;
  const totalPets = pets.length;
  const availablePets = pets.filter(p => p.adoptionStatus === 'available').length;
  const totalAdoptions = applications.filter(a => a.status === 'approved' || a.status === 'completed').length;
  const pendingVerifications = users.filter(u => u.role === 'adopter' && u.verificationStatus === 'pending').length;
  const pendingNgos = users.filter(u => u.role === 'ngo' && u.ngoDetails && !u.ngoDetails.verified).length;

  return res.json({
    stats: {
      totalUsers,
      totalNgos,
      totalPets,
      availablePets,
      totalAdoptions,
      pendingVerifications,
      pendingNgos
    }
  });
});

// List all users with filtering
router.get('/users', protect, authorize('admin'), (req, res) => {
  const users = store.getUsers().map(u => {
    const { password, ...safeUser } = u;
    return safeUser;
  });
  return res.json({ users });
});

// Verify or reject NGO
router.put('/ngo/:id/verify', protect, authorize('admin'), (req, res) => {
  const { verified } = req.body;
  const user = store.getUserById(req.params.id);

  if (!user || user.role !== 'ngo') {
    return res.status(404).json({ message: 'NGO not found.' });
  }

  const updatedUser = store.updateUser(req.params.id, {
    ngoDetails: {
      ...user.ngoDetails,
      verified: Boolean(verified)
    }
  });

  const { password, ...safeUser } = updatedUser;
  return res.json({ message: `NGO ${verified ? 'verified' : 'unverified'} successfully!`, user: safeUser });
});

// Reset database to demo defaults
router.post('/reset-demo', protect, authorize('admin'), (req, res) => {
  store.resetToDefault();
  return res.json({ message: 'Demo data reset successfully.' });
});

export default router;
