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
    const { description, title, videoUrl } = req.body;

    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    let desc = await AboutDescription.findOne();

    if (!desc) {
      desc = await AboutDescription.create({
        description,
        title: title || '',
        videoUrl: videoUrl || '',
      });
    } else {
      desc.description = description;
      if (title !== undefined) desc.title = title;
      if (videoUrl !== undefined) desc.videoUrl = videoUrl;
      await desc.save();
    }

    res.json(desc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
