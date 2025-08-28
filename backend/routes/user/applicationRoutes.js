// routes/applicationRoutes.js
import express from 'express';
import { submitApplication } from '../../controllers/applicationController.js';
import upload from '../../middleware/upload.js';

const router = express.Router();

// Accept a single file named "resume"
router.post('/', upload.single('resume'), submitApplication);

export default router;
