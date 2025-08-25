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

    const product = await LatestProduct.create({
      image: req.file.path,
      title,
      description,
      features,
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

    const updateData = { title, description, features, link };
    if (req.file?.path) updateData.image = req.file.path;

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


