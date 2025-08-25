import express from 'express';
import { subscribeUser } from '../../controllers/newsletterController.js';

const router = express.Router();

router.post('/subscribe', subscribeUser); // If you only want GET, change to .get()

export default router;
