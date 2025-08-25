import express from "express";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../controllers/serviceController.js"; // Note the .js extension

const router = express.Router();

// CRUD routes
router.get("/", getServices);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
