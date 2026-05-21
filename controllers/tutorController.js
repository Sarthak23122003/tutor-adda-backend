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
// ======================================
// GET ALL TUTORS WITH FILTERS
// ======================================
exports.getAllTutors = async (req, res) => {

  try {

    // SEARCH QUERY
    const keyword = req.query.keyword
      ? {
          subjects: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    // FILTERS
    const filters = {};

    // CITY FILTER
    if (req.query.city) {
      filters.city = req.query.city;
    }

    // TEACHING MODE FILTER
    if (req.query.teachingMode) {
      filters.teachingMode =
        req.query.teachingMode;
    }

    // EXPERIENCE FILTER
    if (req.query.experience) {
      filters.experience = {
        $gte: Number(req.query.experience),
      };
    }

    // RATING FILTER
    if (req.query.rating) {
      filters.rating = {
        $gte: Number(req.query.rating),
      };
    }

    // PRICE FILTER
    if (req.query.maxPrice) {
      filters.hourlyRate = {
        $lte: Number(req.query.maxPrice),
      };
    }

    // PAGINATION
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // SORTING
    let sortOption = {};

    if (req.query.sort === "price") {
      sortOption.hourlyRate = 1;
    }

    if (req.query.sort === "rating") {
      sortOption.rating = -1;
    }

    if (req.query.sort === "experience") {
      sortOption.experience = -1;
    }

    // FIND TUTORS
    const tutors = await Tutor.find({
      ...keyword,
      ...filters,
    })
      .populate(
        "user",
        "name email"
      )
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    // TOTAL COUNT
    const totalTutors =
      await Tutor.countDocuments({
        ...keyword,
        ...filters,
      });

    return res.status(200).json({
      success: true,

      totalTutors,

      currentPage: page,

      totalPages: Math.ceil(
        totalTutors / limit
      ),

      tutors,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};