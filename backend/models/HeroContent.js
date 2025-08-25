import mongoose from "mongoose";

const heroContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  videoUrl: { type: String, default: "" }, 
});

const HeroContent = mongoose.models.HeroContent || mongoose.model("HeroContent", heroContentSchema);

export default HeroContent;
