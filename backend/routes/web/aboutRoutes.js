import express from 'express';
import multer from 'multer';
import cloudinary from '../../config/cloudinary.js';

import {
  getDescription,
  updateDescription,
} from '../../controllers/aboutDescriptionController.js';

import {
  getValues,
  addValue,
  updateValue,
  deleteValue,
} from '../../controllers/aboutValueController.js';

const router = express.Router();

// Multer setup: memory storage for both image & video
const storage = multer.memoryStorage();

// Image upload middleware with filter
const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, png, webp).'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10MB images
});

// Video upload middleware with filter
const uploadVideo = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (allowedVideoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed (mp4, webm, mov).'));
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // max 50MB videos
});

// Description routes
router.get('/about/description', getDescription);
router.put('/about/description', updateDescription);

// Value routes
router.get('/about/values', getValues);
router.post('/about/values', addValue);
router.put('/about/values/:id', updateValue);
router.delete('/about/values/:id', deleteValue);

// Upload image route
router.post('/about/upload', uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'verzat/about/images' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary error:', error);
          return res.status(500).json({ message: 'Image upload failed' });
        }
        return res.status(200).json({ imageUrl: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during image upload' });
  }
});

// Upload video route
router.post('/about/upload-video', uploadVideo.single('video'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No video uploaded' });

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        folder: 'verzat/about/videos',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary video error:', error);
          return res.status(500).json({ message: 'Video upload failed' });
        }
        return res.status(200).json({ videoUrl: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during video upload' });
  }
});

// Optional: global error handler for multer fileFilter errors
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Only')) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

export default router;
