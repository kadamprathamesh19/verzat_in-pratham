import express from 'express';
import User from '../../models/User.js';
import authAdmin from '../../middleware/authAdmin.js';

const router = express.Router();

// ✅ GET all users (admin-only)
router.get('/', authAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ DELETE a user by ID (admin-only)
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ [Optional] Promote a user to admin
router.put('/promote/:id', authAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isAdmin = true;
    await user.save();

    res.json({ message: `${user.name} is now an admin.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Demote user to regular user (remove admin)
router.put('/demote/:id', authAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isAdmin = false;
    await user.save();

    res.json({ message: `${user.name} is now a regular user.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ Update logged-in admin's profile (name/email)
router.put('/update', authAdmin, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // console.log('REQ.USER:', req.user.id);
    const updatedAdmin = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    res.json({ updatedAdmin });
  } catch (err) {
    console.error('Error updating admin:', err);
    res.status(500).json({ message: 'Server error while updating admin profile.' });
  }
});



export default router;
