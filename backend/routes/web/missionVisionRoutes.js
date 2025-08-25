import express from 'express';
import multer from 'multer';
import { getMissionVision, updateMissionVision } from '../../controllers/missionVisionController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getMissionVision);

router.post(
  '/',
  upload.fields([
    { name: 'missionImage', maxCount: 1 },
    { name: 'visionImage', maxCount: 1 }
  ]),
  updateMissionVision
);

export default router;
