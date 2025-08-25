import express from 'express';
import { getBaseDescription, addOrUpdateBaseDescription } from '../../controllers/baseController.js';

const router = express.Router();

router.get('/base-description/description', getBaseDescription);
router.post('/base-description', addOrUpdateBaseDescription);

export default router;
