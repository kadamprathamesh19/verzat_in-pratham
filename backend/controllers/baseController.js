import BaseDescription from '../models/BaseDescription.js';

export const getBaseDescription = async (req, res) => {
  try {
    const baseDesc = await BaseDescription.findOne().sort({ createdAt: -1 });
    if (!baseDesc) {
      return res.status(404).json({ message: 'No base description found.' });
    }
    res.json({ description: baseDesc.description });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addOrUpdateBaseDescription = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: 'Description is required.' });
    }

    let baseDesc = await BaseDescription.findOne();
    if (baseDesc) {
      baseDesc.description = description;
      await baseDesc.save();
    } else {
      baseDesc = new BaseDescription({ description });
      await baseDesc.save();
    }

    res.json({ message: 'Description saved successfully.', description: baseDesc.description });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
