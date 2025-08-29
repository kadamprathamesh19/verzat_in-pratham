import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Admin from './models/Admin.js'; //use Admin model

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ email: 'admin@verzat.com' }); // ✅ check Admin model

    if (existing) {
      console.log('Admin already exists');
    } else {
      const hashedPassword = await bcrypt.hash('123456789', 10);

      await Admin.create({
        name: 'Admin',
        email: 'admin@verzat.com',
        password: hashedPassword,
      });

      console.log('Admin user created');
    }

    process.exit();
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
