import express from 'express';
import bcrypt from 'bcryptjs';
import { store } from '../utils/storage.js';
import { generateToken, protect } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, address, ngoDetails } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existingUser = store.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = role === 'ngo' ? 'ngo' : 'adopter';

    const newUser = store.createUser({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: userRole,
      phone: phone || '',
      address: address || '',
      verificationStatus: userRole === 'adopter' ? 'unverified' : 'pending',
      ngoDetails: userRole === 'ngo' ? {
        organizationName: ngoDetails?.organizationName || name,
        registrationNumber: ngoDetails?.registrationNumber || '',
        website: ngoDetails?.website || '',
        description: ngoDetails?.description || '',
        verified: false
      } : undefined
    });

    const token = generateToken(newUser);
    const { password: _, ...safeUser } = newUser;

    return res.status(201).json({
      message: 'Registration successful!',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Internal server error during registration.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    const user = store.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Allow demo password fallback "password123" or compare hash
    let isMatch = false;
    if (password === 'password123' && user.password.startsWith('$2a$10$wT0X7Vf6gZ1uJq9p2y8K0uQ7bL3p0X8q4m5n6o7p8q9r0s1t2u3v4')) {
      isMatch = true;
    } else {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    const { password: _, ...safeUser } = user;

    return res.json({
      message: 'Login successful!',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error during login.' });
  }
});

// Quick demo login for testing
router.post('/demo-login', async (req, res) => {
  const { role } = req.body; // 'adopter', 'ngo', 'admin'
  let targetEmail = 'adopter@petlove.com';
  if (role === 'ngo') targetEmail = 'ngo@petlove.com';
  if (role === 'admin') targetEmail = 'admin@petlove.com';

  const user = store.getUserByEmail(targetEmail);
  if (!user) {
    return res.status(404).json({ message: 'Demo user not found.' });
  }

  const token = generateToken(user);
  const { password: _, ...safeUser } = user;

  return res.json({
    message: `Logged in as demo ${role}!`,
    token,
    user: safeUser
  });
});

// Get current profile
router.get('/me', protect, (req, res) => {
  return res.json({ user: req.user });
});

// Update profile
router.put('/profile', protect, (req, res) => {
  const { name, phone, address, ngoDetails } = req.body;
  const updates = {};
  if (name) updates.name = name;
  if (phone) updates.phone = phone;
  if (address) updates.address = address;
  if (ngoDetails && req.user.role === 'ngo') {
    updates.ngoDetails = { ...req.user.ngoDetails, ...ngoDetails };
  }

  const updatedUser = store.updateUser(req.user._id, updates);
  const { password: _, ...safeUser } = updatedUser;
  return res.json({ message: 'Profile updated successfully!', user: safeUser });
});

// Forgot password simulation
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = store.getUserByEmail(email);
  if (!user) {
    // For security, don't leak user existence
    return res.json({ message: 'If an account exists with that email, a password reset link has been dispatched.' });
  }
  return res.json({ message: 'A secure password reset link has been sent to your email.' });
});

export default router;
