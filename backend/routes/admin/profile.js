import express from 'express';
import Admin from '../../models/Admin.js';
import authAdmin from '../../middleware/authAdmin.js';

const router = express.Router();

// PUT /api/admin/profile/update
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
