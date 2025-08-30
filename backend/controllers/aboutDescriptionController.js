import { decode } from 'html-entities';
import AboutDescription from '../models/AboutDescription.js';

// GET description
export const getDescription = async (req, res) => {
  try {
    let desc = await AboutDescription.findOne();
    if (!desc) {
      desc = await AboutDescription.create({ description: '', title: '', videoUrl: '' });
    }
    res.json(desc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT description
export const updateDescription = async (req, res) => {
  try {
    // req.body contains data sanitized by the xss() middleware
    const { description, title, videoUrl } = req.body;

    // Decode the sanitized strings back to their original form
    const decodedDescription = decode(description || '');
    const decodedTitle = decode(title || '');

    if (!decodedDescription) {
      return res.status(400).json({ message: 'Description is required' });
    }

    let desc = await AboutDescription.findOne();

    if (!desc) {
      // Create document with decoded data
      desc = await AboutDescription.create({
        description: decodedDescription,
        title: decodedTitle,
        videoUrl: videoUrl || '',
      });
    } else {
      // Update document with decoded data
      desc.description = decodedDescription;
      desc.title = decodedTitle;
      if (videoUrl !== undefined) desc.videoUrl = videoUrl;
      await desc.save();
    }

    res.json(desc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
