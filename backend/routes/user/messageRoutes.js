import express from 'express';
import { sendMessage } from '../../controllers/messageController.js';

const router = express.Router();

router.post('/', sendMessage); // If you want to fetch messages, change this to .get()

export default router;
