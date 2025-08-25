import Contact from '../models/Contact.js';

// Get current contact info
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ updatedAt: -1 });
    if (!contact) {
      return res.status(404).json({ message: 'Contact info not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update or create contact info
export const updateContact = async (req, res) => {
  const { pageTitle, address, email, phone, mapEmbedUrl } = req.body;

  if (!pageTitle || !address || !email || !phone || !mapEmbedUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let contact = await Contact.findOne();

    if (contact) {
      // Update existing
      contact.pageTitle = pageTitle;
      contact.address = address;
      contact.email = email;
      contact.phone = phone;
      contact.mapEmbedUrl = mapEmbedUrl;

      await contact.save();
      return res.json(contact);
    } else {
      // Create new
      contact = new Contact({
        pageTitle,
        address,
        email,
        phone,
        mapEmbedUrl,
      });

      await contact.save();
      return res.status(201).json(contact);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
