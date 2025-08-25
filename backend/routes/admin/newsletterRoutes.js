import express from 'express';
import NewsletterSubscriber from '../../models/NewsletterSubscriber.js';
const router = express.Router();


// Get all newsletter subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find({});
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Already have: router.post('/subscribe', subscribeUser)



// DELETE subscriber by ID
router.delete('/:id', async (req, res) => {
  try {
    const subscriber = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    res.json({ message: 'Subscriber deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
