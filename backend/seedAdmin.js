import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcrypt';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: 'admin@example.com' });

    if (existing) {
      console.log('Admin already exists');
    } else {
      const hashedPassword = await bcrypt.hash('123456789', 10);

      await User.create({
        name: 'Admin',
        email: 'admin@verzat.com',
        password: hashedPassword,
        isAdmin: true,
      });

      console.log('✅ Admin user created');
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
