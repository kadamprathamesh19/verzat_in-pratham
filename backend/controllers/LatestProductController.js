import { decode } from 'html-entities';
import LatestProduct from '../models/LatestProduct.js';

export const getLatestProducts = async (req, res) => {
  try {
    const products = await LatestProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addLatestProduct = async (req, res) => {
  try {
    const { title, description, features, link } = req.body;
    if (!req.file?.path) {
      return res.status(400).json({ error: 'Image is required' });
    }
    if (!link) {
      return res.status(400).json({ error: 'Product link is required' });
    }

    // Decode text fields before creating
    const decodedTitle = decode(title || '');
    const decodedDescription = decode(description || '');
    // Features is an array, so map over it to decode each item
    const decodedFeatures = Array.isArray(features) ? features.map(f => decode(f || '')) : [];

    const product = await LatestProduct.create({
      image: req.file.path,
      title: decodedTitle,
      description: decodedDescription,
      features: decodedFeatures,
      link,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLatestProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, features, link } = req.body;

    const updateData = {};
    if (link) updateData.link = link;
    if (req.file?.path) updateData.image = req.file.path;

    // Decode text fields if they exist in the body
    if (title) {
        updateData.title = decode(title);
    }
    if (description) {
        updateData.description = decode(description);
    }
    if (features && Array.isArray(features)) {
        updateData.features = features.map(f => decode(f || ''));
    }


    const updated = await LatestProduct.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLatestProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LatestProduct.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
