import express from 'express';
import { store } from '../utils/storage.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Adopter submits verification documents
router.post('/submit',
  protect,
  upload.fields([
    { name: 'govtId', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 }
  ]),
  (req, res) => {
    try {
      const { govtIdType, idNumber } = req.body;

      let govtIdUrl = req.body.govtIdUrl;
      let addressProofUrl = req.body.addressProofUrl;

      if (req.files && req.files.govtId && req.files.govtId[0]) {
        govtIdUrl = `${req.protocol}://${req.get('host')}/uploads/${req.files.govtId[0].filename}`;
      }
      if (req.files && req.files.addressProof && req.files.addressProof[0]) {
        addressProofUrl = `${req.protocol}://${req.get('host')}/uploads/${req.files.addressProof[0].filename}`;
      }

      if (!govtIdUrl) {
        return res.status(400).json({ message: 'Government ID document is required.' });
      }

      const updatedUser = store.updateUser(req.user._id, {
        verificationStatus: 'pending',
        verificationDocuments: {
          govtIdType: govtIdType || 'Aadhaar Card',
          idNumber: idNumber ? `${idNumber.slice(0, 2)}****${idNumber.slice(-4)}` : 'Verified on file',
          govtIdUrl,
          addressProofUrl: addressProofUrl || '',
          submittedAt: new Date().toISOString(),
          reviewedAt: null,
          rejectionReason: null
        }
      });

      const { password: _, ...safeUser } = updatedUser;
      return res.json({
        message: 'Verification documents submitted! An administrator will review your application shortly.',
        user: safeUser
      });
    } catch (error) {
      console.error('Verification submission error:', error);
      return res.status(500).json({ message: 'Error processing verification documents.' });
    }
  }
);

// Get current adopter's verification status
router.get('/my-status', protect, (req, res) => {
  const user = store.getUserById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({
    verificationStatus: user.verificationStatus || 'unverified',
    verificationDocuments: user.verificationDocuments || null
  });
});

// Admin reviews verification (Approve / Reject)
router.put('/:userId/review', protect, authorize('admin'), (req, res) => {
  const { status, rejectionReason } = req.body;
  const user = store.getUserById(req.params.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  if (!['verified', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: 'Status must be verified, rejected, or pending.' });
  }

  const currentDocs = user.verificationDocuments || {};
  const updatedUser = store.updateUser(req.params.userId, {
    verificationStatus: status,
    verificationDocuments: {
      ...currentDocs,
      reviewedAt: new Date().toISOString(),
      rejectionReason: status === 'rejected' ? (rejectionReason || 'Document details did not match required criteria.') : null
    }
  });

  const { password: _, ...safeUser } = updatedUser;
  return res.json({
    message: `Adopter verification updated to ${status}!`,
    user: safeUser
  });
});

export default router;
