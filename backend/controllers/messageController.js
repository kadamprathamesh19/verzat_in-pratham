import Message from '../models/Message.js';

// @desc    Create a new message
// @route   POST /api/messages
// @access  Public
export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const newMessage = await Message.create({
    name,
    email,
    message,
  });

  res.status(201).json({
    _id: newMessage._id,
    name: newMessage.name,
    email: newMessage.email,
    message: newMessage.message,
    createdAt: newMessage.createdAt,
  });
};
