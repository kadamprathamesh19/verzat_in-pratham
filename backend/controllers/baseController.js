import { decode } from 'html-entities';
import BaseDescription from '../models/BaseDescription.js';

export const getBaseDescription = async (req, res) => {
  try {
    const baseDesc = await BaseDescription.findOne().sort({ createdAt: -1 });
    if (!baseDesc) {
      // To avoid errors on a fresh DB, let's create a default one if it doesn't exist.
      const newDesc = await BaseDescription.create({ description: 'Default parent company description.' });
      return res.json({ description: newDesc.description });
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

    // Decode the sanitized description from the xss middleware
    const decodedDescription = decode(description);

    let baseDesc = await BaseDescription.findOne();
    if (baseDesc) {
      // Update with the decoded description
      baseDesc.description = decodedDescription;
      await baseDesc.save();
    } else {
      // Create with the decoded description
      baseDesc = new BaseDescription({ description: decodedDescription });
      await baseDesc.save();
    }

    res.json({ message: 'Description saved successfully.', description: baseDesc.description });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
