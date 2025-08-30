// FILE: routes/web/heroRoutes.js

import express from "express";
import HeroContent from "../../models/HeroContent.js";
import { decode } from 'html-entities';

const router = express.Router();

// === VERIFY THIS GET ROUTE EXISTS AND IS CORRECT ===
router.get("/hero-content", async (req, res) => {
  try {
    let content = await HeroContent.findOne();

    if (!content) {
      // If no content, create and return default content
      content = await HeroContent.create({
        title: "Pioneering Innovation in R&D",
        subtitle: "Welcome to Verzat Research & Development — where breakthrough ideas become real-world impact.",
        videoUrl: "", 
      });
    }
    res.json(content);
  } catch (err) {
    console.error("Error fetching hero content:", err);
    res.status(500).json({ message: "Server error while fetching hero content" });
  }
});

// === THIS IS THE PUT ROUTE WE FIXED EARLIER ===
router.put("/hero-content-update", async (req, res) => {
  const { title, subtitle, videoUrl } = req.body;

  try {
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
    res.status(500).json({ message: "Update failed due to a server error" });
  }
});

export default router;