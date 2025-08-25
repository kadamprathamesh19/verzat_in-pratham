import express from 'express';
import { getContact, updateContact } from '../../controllers/contactController.js';

const router = express.Router();

router.get('/contact', getContact);
router.put('/contact', updateContact);

export default router;
