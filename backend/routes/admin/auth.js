// routes/admin/auth.js
import express from 'express';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email });
  if (!admin || !admin.isAdmin)
    return res.status(401).json({ message: 'Unauthorized: Not an admin' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch)
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: admin._id, email: admin.email, isAdmin: true },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
});

export default router;
