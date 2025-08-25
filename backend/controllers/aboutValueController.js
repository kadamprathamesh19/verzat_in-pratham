import AboutValue from '../models/AboutValue.js';

// GET all values
export const getValues = async (req, res) => {
  try {
    const values = await AboutValue.find();
    res.json(values);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD value
export const addValue = async (req, res) => {
  try {
    const { title, desc, image } = req.body;
    if (!title || !desc || !image) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const newValue = await AboutValue.create({ title, desc, image });
    res.status(201).json(newValue);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE value
export const updateValue = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await AboutValue.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE value
export const deleteValue = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AboutValue.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
