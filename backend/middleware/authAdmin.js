// middleware/authAdmin.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }

    req.user = user; // ✅ now req.user.id will work
    next();
  } catch (err) {
    console.error('Admin Auth Error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authAdmin;







// /////////////////////////////////////////////////////////
// const authAdmin = (req, res, next) => {
//   const authHeader = req.headers.authorization;
  
//   if (!authHeader || !authHeader.startsWith('Bearer '))
//     return res.status(401).json({ message: 'Unauthorized' });

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded.isAdmin) throw new Error('Not an admin');

//     req.admin = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };
// /////////////////////////////////////////////////////////