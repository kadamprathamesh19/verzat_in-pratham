import mongoose from 'mongoose';

const MissionVisionSchema = new mongoose.Schema({
  missionTitle: { type: String, required: true },
  missionDescription: { type: String, required: true },
  missionImageUrl: { type: String, default: '' },
  visionTitle: { type: String, required: true },
  visionDescription: { type: String, required: true },
  visionImageUrl: { type: String, default: '' }
}, { timestamps: true });

const MissionVision = mongoose.models.MissionVision || mongoose.model('MissionVision', MissionVisionSchema);

export default MissionVision;
