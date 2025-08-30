// routes/web/heroRoutes.js

import express from "express";
import HeroContent from "../../models/HeroContent.js";
import { decode } from 'html-entities';

const router = express.Router();

// ... (your GET route remains the same) ...

// PUT update hero content
router.put("/hero-content-update", async (req, res) => {
  // req.body contains the sanitized strings from the xss() middleware
  const { title, subtitle, videoUrl } = req.body;

  try {
    // Decode the sanitized strings back to their original form
    const decodedTitle = decode(title);
    const decodedSubtitle = decode(subtitle);

    let content = await HeroContent.findOne();

    if (!content) {
      content = await HeroContent.create({
        title: decodedTitle,
        subtitle: decodedSubtitle,
        videoUrl
      });
    } else {
      content.title = decodedTitle;
      content.subtitle = decodedSubtitle;

      if (typeof videoUrl !== "undefined") {
        content.videoUrl = videoUrl;
      }
      await content.save();
    }
    res.json(content);
  } catch (err) {
    console.error("Error updating hero content:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;