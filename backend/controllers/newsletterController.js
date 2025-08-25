import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

// @desc    Subscribe a user to the newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
export const subscribeUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate input
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        // ✅ Check if email is in valid format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        // Check if already subscribed
        const existing = await NewsletterSubscriber.findOne({ email });

        if (existing) {
            return res.status(400).json({ success: false, message: 'You are already subscribed!' });
        }

        // Save new subscriber
        const newSubscriber = new NewsletterSubscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ success: true, message: 'Subscribed successfully!' });
    } catch (error) {
        console.error('Newsletter subscription error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
