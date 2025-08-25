import MissionVision from '../models/MissionVision.js';
import cloudinary from '../config/cloudinary.js';

export const getMissionVision = async (req, res) => {
  try {
    const data = await MissionVision.findOne({});
    res.json(data || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateMissionVision = async (req, res) => {
  try {
    const updates = {
      missionTitle: req.body.missionTitle,
      missionDescription: req.body.missionDescription,
      visionTitle: req.body.visionTitle,
      visionDescription: req.body.visionDescription
    };

    const uploadToCloudinary = (fileBuffer, folder) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        ).end(fileBuffer);
      });
    };

    if (req.files?.missionImage) {
      updates.missionImageUrl = await uploadToCloudinary(req.files.missionImage[0].buffer, 'mission-vision');
    }

    if (req.files?.visionImage) {
      updates.visionImageUrl = await uploadToCloudinary(req.files.visionImage[0].buffer, 'mission-vision');
    }

    const record = await MissionVision.findOneAndUpdate({}, updates, { new: true, upsert: true });
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
};
