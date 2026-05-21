const Tutor = require("../models/Tutor");

exports.uploadTutorImage = async (req, res) => {
  try {
    const tutor = await Tutor.findOne({
      user: req.user.id,
    });

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    tutor.profileImage = req.file.path;

    await tutor.save();

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: req.file.path,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};