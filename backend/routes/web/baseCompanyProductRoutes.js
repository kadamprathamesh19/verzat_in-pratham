import express from 'express';
import multer from 'multer';
import {
  addBaseCompanyProduct,
  getBaseCompanyProducts,
  updateBaseCompanyProduct,
  deleteBaseCompanyProduct
} from '../../controllers/baseCompanyProductController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/base-company-product', upload.single('image'), addBaseCompanyProduct);
router.get('/base-company-product', getBaseCompanyProducts);
router.put('/base-company-product/:id', upload.single('image'), updateBaseCompanyProduct);
router.delete('/base-company-product/:id', deleteBaseCompanyProduct);

export default router;
