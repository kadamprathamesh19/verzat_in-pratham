// middleware/upload.js
import multer from 'multer';

const storage = multer.memoryStorage();

// Allowed MIME types for images, videos, and PDFs
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
const allowedDocTypes = ['application/pdf'];

// General file filter to allow images, videos, and PDFs
const fileFilter = (req, file, cb) => {
  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedVideoTypes.includes(file.mimetype) ||
    allowedDocTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only image, video, and PDF files are allowed'));
  }
};

// Limits - max 50MB file size
const limits = {
  fileSize: 50 * 1024 * 1024, // 50 MB
};

// Single upload middleware (will be used in routes)
const upload = multer({
  storage,
  fileFilter,
  limits,
});

export default upload;
