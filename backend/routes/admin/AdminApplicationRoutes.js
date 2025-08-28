import express from 'express';
import {
  getAllApplications,
  deleteApplication,
} from '../../controllers/applicationController.js';

const router = express.Router();

// Admin Routes
router.get('/', getAllApplications); // GET /api/admin/applications
router.delete('/:id', deleteApplication); // DELETE /api/admin/applications/:id

export default router;