import BaseCompanyProduct from '../models/BaseCompanyProduct.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

// Helper: Upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'base_company_products' },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};



////////////////////// COMPANY PRODUCTS //////////////////////

// Add a product
export const addBaseCompanyProduct = async (req, res) => {
  try {
    const { name, longform } = req.body;
    if (!name || !longform) {
      return res.status(400).json({ message: 'Name and longform are required.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required.' });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const product = new BaseCompanyProduct({
      name,
      longform,
      imageUrl: result.secure_url,
    });

    await product.save();

    res.status(201).json({ message: 'Product added successfully.', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
export const getBaseCompanyProducts = async (req, res) => {
  try {
    const products = await BaseCompanyProduct.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product
export const updateBaseCompanyProduct = async (req, res) => {
  try {
    const { name, longform } = req.body;
    const { id } = req.params;

    const product = await BaseCompanyProduct.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    if (name) product.name = name;
    if (longform) product.longform = longform;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      product.imageUrl = result.secure_url;
    }

    await product.save();

    res.status(200).json({ message: 'Product updated successfully.', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
export const deleteBaseCompanyProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await BaseCompanyProduct.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
