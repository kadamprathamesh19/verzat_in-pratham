import LatestDescription from '../models/LatestDescription.js';

// ✅ GET latest-section
export const getLatestDescription = async (req, res) => {
  try {
    let doc = await LatestDescription.findOne().sort({ createdAt: -1 });
    if (!doc) {
      doc = await LatestDescription.create({ description: '' });
    }
    res.json(doc); // Now returning full object (title, image, description)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ PUT latest-section
export const updateLatestDescription = async (req, res) => {
  try {
    const { sectionTitle, sectionImage, description } = req.body;

    // Build update object dynamically
    const updateData = {};
    if (sectionTitle !== undefined) updateData.sectionTitle = sectionTitle;
    if (sectionImage !== undefined) updateData.sectionImage = sectionImage;
    if (description !== undefined) updateData.description = description;

    // If nothing valid to update, return error
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update.' });
    }

    const doc = await LatestDescription.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    );

    res.json(doc);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Server error during update' });
  }
};


