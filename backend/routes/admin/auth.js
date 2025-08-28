import express from 'express';
import Admin from '../../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// POST /api/admin/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, admin: { name: admin.name, email: admin.email } });
});

export default router;
