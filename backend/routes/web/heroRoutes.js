import express from "express";
import HeroContent from "../../models/HeroContent.js";
import { decode } from 'html-entities';

const router = express.Router();

// GET hero content
router.get("/hero-content", async (req, res) => {
  try {
    let content = await HeroContent.findOne();

    if (!content) {
      content = await HeroContent.create({
        title: "Pioneering Innovation in R&D",
        subtitle: "Welcome to Verzat Research & Development — where breakthrough ideas become real-world impact.",
        videoUrl: "", // default empty
      });
    }

    res.json(content);
  } catch (err) {
    console.error("Error fetching hero content:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update hero content
router.put("/hero-content-update", async (req, res) => {
  const { title, subtitle, videoUrl } = req.body;

  console.log("Received body in PUT /hero-content-update:", req.body);
  tit = decode(title);
  subtitle = decode(subtitle);

  try {
    let content = await HeroContent.findOne();

    if (!content) {
      content = await HeroContent.create({ title, subtitle, videoUrl });
    } else {
      content.title = tit;
      content.subtitle = subtitle;

      if (typeof videoUrl !== "undefined") {
        content.videoUrl = videoUrl;
      }

      await content.save();
      console.log(content);
    }

    res.json(content);
  } catch (err) {
    console.error("Error updating hero content:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
