import express from "express";
import ServicePageDescription from "../../models/ServicePageDescription.js";

const router = express.Router();


/**
 * GET /api/service-description/title
 */
router.get("/title", async (req, res) => {
  try {
    const doc = await ServicePageDescription.findOne();
    res.json({ title: doc?.title || "" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch title" });
  }
});

/**
 * PUT /api/service-description/title
 */
router.put("/title", async (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Title is required and must be a string." });
  }

  try {
    let doc = await ServicePageDescription.findOne();
    if (!doc) {
      doc = new ServicePageDescription({ title, description: "" }); // Initialize description to avoid required error
    } else {
      doc.title = title;
    }

    await doc.save();
    res.json({ message: "Title updated", title: doc.title });
  } catch (err) {
    res.status(500).json({ error: "Failed to update title" });
  }
});

/**
 * GET /api/service-description/description
 */
router.get("/description", async (req, res) => {
  try {
    const descDoc = await ServicePageDescription.findOne();
    res.json({ description: descDoc?.description || "" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch description" });
  }
});

/**
 * PUT /api/service-description/description
 */
router.put("/description", async (req, res) => {
  const { description } = req.body;

  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "Description is required and must be a string." });
  }

  try {
    let doc = await ServicePageDescription.findOne();
    if (!doc) {
      doc = new ServicePageDescription({ description });
    } else {
      doc.description = description;
    }

    await doc.save();
    res.json({ message: "Updated", description: doc.description });
  } catch (err) {
    res.status(500).json({ error: "Failed to update description" });
  }
});


export default router;
