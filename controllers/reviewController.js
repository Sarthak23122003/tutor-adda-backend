const Review = require("../models/Review");

const Tutor = require("../models/Tutor");

const asyncHandler = require(
  "../middleware/asyncHandler"
);


// ======================================
// CREATE REVIEW
// ======================================
exports.createReview = asyncHandler(
  async (req, res) => {

    const studentId = req.user.id;

    const {
      tutorId,
      rating,
      comment
    } = req.body;

    // CHECK EXISTING REVIEW
    const existingReview =
      await Review.findOne({
        student: studentId,
        tutor: tutorId,
      });

    if (existingReview) {
      const error = new Error(
        "You already reviewed this tutor"
      );
      error.statusCode = 400;
      throw error;
    }

    // CREATE REVIEW
    const review = await Review.create({
      student: studentId,
      tutor: tutorId,
      rating,
      comment,
    });

    // CALCULATE AVERAGE
    const reviews = await Review.find({
      tutor: tutorId,
    });

    const totalRatings =
      reviews.reduce(
        (sum, item) =>
          sum + item.rating,
        0
      );

    const averageRating =
      totalRatings / reviews.length;

    // UPDATE TUTOR PROFILE
    await Tutor.findOneAndUpdate(
      { user: tutorId },
      {
        averageRating,
        totalReviews: reviews.length,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });

  }
);


// ======================================
// GET TUTOR REVIEWS
// ======================================
exports.getTutorReviews = asyncHandler(
  async (req, res) => {

    const reviews = await Review.find({
      tutor: req.params.tutorId,
    })
      .populate(
        "student",
        "name email"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  }
);