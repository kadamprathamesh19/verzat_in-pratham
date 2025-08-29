import express from 'express';
import Admin from '../../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// POST /api/admin/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });

  const admin = await Admin.findOne({ email });
  console.log('Admin found:', admin);  // Add this
  if (!admin) {
    console.log('No admin with email:', email);
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  console.log('Password match result:', isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, admin: { name: admin.name, email: admin.email } });
});

export default router;
