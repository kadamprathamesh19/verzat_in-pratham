import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../config/cloudinary.js';
import {
  getLatestProducts,
  addLatestProduct,
  updateLatestProduct,
  deleteLatestProduct
} from '../../controllers/LatestProductController.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'latest-products',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  }
});

const upload = multer({ storage });

router.get('/', getLatestProducts);
router.post('/', upload.single('image'), addLatestProduct);
router.put('/:id', upload.single('image'), updateLatestProduct);
router.delete('/:id', deleteLatestProduct);

export default router;
