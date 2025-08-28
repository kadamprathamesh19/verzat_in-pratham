import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { xss } from 'express-xss-sanitizer';
import connectDB from './config/db.js';

// Frontend (user) routes
import userRoutes from './routes/user/userRoutes.js';
import messageRoutes from './routes/user/messageRoutes.js';
import newsletterRoutes from './routes/user/newsletterRoutes.js';
import applicationRoutes from './routes/user/applicationRoutes.js';

// Admin routes
import adminUserRoutes from './routes/admin/userRoutes.js';
import adminMessageRoutes from './routes/admin/messageRoutes.js';
import adminNewsletterRoutes from './routes/admin/newsletterRoutes.js';
import adminAuthRoutes from './routes/admin/auth.js';
import adminApplicationRoutes from './routes/admin/AdminApplicationRoutes.js';

// WEB Routes
import heroRoutes from './routes/web/heroRoutes.js';
import adminVideoUploadRoute from './routes/web/adminVideoUpload.js';
import serviceRoutes from './routes/web/serviceRoutes.js';
import ServiceDescriptionRoute from './routes/web/ServiceDescriptionRoute.js';
import aboutRoutes from './routes/web/aboutRoutes.js';
import missionVisionRoutes from './routes/web/missionVisionRoutes.js';
import baseRoutes from './routes/web/baseRoutes.js';
import baseCompanyProductRoutes from './routes/web/baseCompanyProductRoutes.js';
import latestDescriptionRoutes from './routes/web/LatestDescriptionRoutes.js';
import latestProductRoutes from './routes/web/LatestProductRoutes.js';
import contactRoutes from './routes/web/contactRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Security & Middleware
app.use(helmet());           // Sets secure HTTP headers
app.use(cors());             // Enable CORS
app.use(express.json());     // Parse JSON bodies
app.use(xss());              // Sanitize incoming data

// User Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/applications', applicationRoutes);

// Admin Auth
app.use('/api/admin/auth', adminAuthRoutes);

// Admin Routes
app.use('/api/admin/users', adminUserRoutes);         
app.use('/api/admin/messages', adminMessageRoutes);   
app.use('/api/admin/newsletter', adminNewsletterRoutes); 
app.use('/api/admin/applications', adminApplicationRoutes);

// WEB Routes
app.use('/api/hero', heroRoutes);
app.use('/api/admin', adminVideoUploadRoute);
app.use('/api/services', serviceRoutes);
app.use('/api/service-description', ServiceDescriptionRoute);
app.use('/api', aboutRoutes);
app.use('/api/mission-vision', missionVisionRoutes);
app.use('/api', baseRoutes);
app.use('/api', baseCompanyProductRoutes);
app.use('/api/latest-description', latestDescriptionRoutes);
app.use('/api/latest-products', latestProductRoutes);
app.use('/api', contactRoutes);

// Optional: Global error handler (can be expanded)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
