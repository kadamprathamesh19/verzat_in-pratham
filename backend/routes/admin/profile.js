import express from 'express';
import Admin from '../../models/Admin.js';
import authAdmin from '../../middleware/authAdmin.js';

const router = express.Router();

// ADD THIS NEW ROUTE HANDLER
// @route   GET /api/admin/profile
// @desc    Get current logged-in admin's profile
// @access  Private
router.get('/', authAdmin, (req, res) => {
  try {
    // The authAdmin middleware has already verified the token
    // and attached the admin user object to the request (req.admin).
    // We can now send it back, but let's exclude the password.
    res.json({
      admin: {
        _id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   PUT /api/admin/profile/update
// @desc    Update admin profile
// @access  Private
router.put('/update', authAdmin, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (password) admin.password = password; // Will get hashed in pre-save

    await admin.save();

    res.json({
      message: 'Profile updated',
      updatedAdmin: {
        name: admin.name,
        email: admin.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});

export default router;