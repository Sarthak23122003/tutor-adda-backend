const Tutor = require("../models/Tutor");


// CREATE TUTOR PROFILE
exports.createTutorProfile = async (req, res) => {
  try {

    const {
      subjects,
      skills,
      experience,
      hourlyRate,
      qualification,
      bio,
      profileImage,
      availability,
    } = req.body;

    // Check existing profile
    const existingTutor = await Tutor.findOne({
      user: req.user.id,
    });

    if (existingTutor) {
      return res.status(400).json({
        success: false,
        message: "Tutor profile already exists",
      });
    }

    // Create profile
    const tutor = await Tutor.create({
      user: req.user.id,
      subjects,
      skills,
      experience,
      hourlyRate,
      qualification,
      bio,
      profileImage,
      availability,
    });

    res.status(201).json({
      success: true,
      message: "Tutor profile created",
      tutor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ADD AVAILABILITY
exports.addAvailability = async (req, res) => {
  try {

    const { day, startTime, endTime } = req.body;

    // FIND TUTOR PROFILE
    const tutor = await Tutor.findOne({
      user: req.user.id
    });

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found"
      });
    }

    // PUSH AVAILABILITY
    tutor.availability.push({
      day,
      startTime,
      endTime
    });

    await tutor.save();

    res.status(200).json({
      success: true,
      message: "Availability added successfully",
      availability: tutor.availability
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
// UPDATE TUTOR PROFILE
exports.updateTutorProfile = async (req, res) => {
  try {

    const tutor = await Tutor.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      {
        new: true,
      }
    );

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor profile updated",
      tutor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// GET MY TUTOR PROFILE
exports.getMyTutorProfile = async (req, res) => {
  try {

    const tutor = await Tutor.findOne({
      user: req.user.id,
    }).populate("user", "name email role");

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      tutor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// GET ALL TUTORS
exports.getAllTutors = async (req, res) => {
  try {

    const tutors = await Tutor.find()
      .populate("user", "name email role");

    res.status(200).json({
      success: true,
      count: tutors.length,
      tutors,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// SEARCH TUTORS
exports.searchTutors = async (req, res) => {

  try {

    const {
      subject,
      city,
      availability,
      minRate,
      maxRate,
    } = req.query;

    let filter = {};

    // SUBJECT SEARCH
    if (subject) {

      filter.subjects = {
        $regex: subject,
        $options: "i",
      };

    }

    // CITY SEARCH
    if (city) {

      filter.city = {
        $regex: city,
        $options: "i",
      };

    }

    // AVAILABILITY FILTER
    if (availability) {

      filter.availability = availability;

    }

    // HOURLY RATE FILTER
    if (minRate || maxRate) {

      filter.hourlyRate = {};

      if (minRate) {
        filter.hourlyRate.$gte = Number(minRate);
      }

      if (maxRate) {
        filter.hourlyRate.$lte = Number(maxRate);
      }

    }

    const tutors = await Tutor.find(filter)
      .populate("user", "name email role");

    res.status(200).json({
      success: true,
      count: tutors.length,
      tutors,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
exports.updateAvailability = async (req, res) => {

  try {

    const tutorId = req.user.id;

    const { availability } = req.body;

    // Find tutor profile
    const tutor = await Tutor.findOne({
      user: tutorId,
    });

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found",
      });
    }

    // Update availability
    tutor.availability = availability;

    await tutor.save();

    return res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      availability: tutor.availability,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};