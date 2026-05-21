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

    // CHECK TUTOR EXISTS
    const tutor =
      await Tutor.findOne({
        user: tutorId,
      });

    if (!tutor) {

      const error = new Error(
        "Tutor not found"
      );

      error.statusCode = 404;

      throw error;
    }

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
    const review =
      await Review.create({

        student: studentId,

        tutor: tutorId,

        rating,

        comment,

      });

    // GET ALL REVIEWS
    const reviews =
      await Review.find({
        tutor: tutorId,
      });

    // CALCULATE TOTAL
    const totalRatings =
      reviews.reduce(
        (acc, item) =>
          acc + item.rating,
        0
      );

    // CALCULATE AVERAGE
    const averageRating =
      totalRatings / reviews.length;

    // UPDATE TUTOR
    tutor.rating =
      averageRating.toFixed(1);

    tutor.totalReviews =
      reviews.length;

    await tutor.save();

    return res.status(201).json({

      success: true,

      message:
        "Review added successfully",

      review,

      tutorRating:
        tutor.rating,

      totalReviews:
        tutor.totalReviews,

    });

  }
);


// ======================================
// GET TUTOR REVIEWS
// ======================================
exports.getTutorReviews = asyncHandler(
  async (req, res) => {

    const reviews =
      await Review.find({

        tutor:
          req.params.tutorId,

      })
        .populate(
          "student",
          "name email"
        )
        .sort({
          createdAt: -1
        });

    return res.status(200).json({

      success: true,

      count: reviews.length,

      reviews,

    });

  }
);


// ======================================
// DELETE REVIEW
// ======================================
exports.deleteReview = asyncHandler(
  async (req, res) => {

    const review =
      await Review.findById(
        req.params.id
      );

    if (!review) {

      const error = new Error(
        "Review not found"
      );

      error.statusCode = 404;

      throw error;

    }

    // CHECK OWNERSHIP
    if (
      review.student.toString() !==
      req.user.id
    ) {

      const error = new Error(
        "Access denied"
      );

      error.statusCode = 403;

      throw error;

    }

    const tutorId =
      review.tutor;

    // DELETE REVIEW
    await review.deleteOne();

    // RECALCULATE REVIEWS
    const reviews =
      await Review.find({
        tutor: tutorId,
      });

    let averageRating = 0;

    if (reviews.length > 0) {

      const totalRatings =
        reviews.reduce(
          (acc, item) =>
            acc + item.rating,
          0
        );

      averageRating =
        totalRatings /
        reviews.length;

    }

    // UPDATE TUTOR
    await Tutor.findOneAndUpdate(

      { user: tutorId },

      {
        rating:
          averageRating.toFixed(1),

        totalReviews:
          reviews.length,
      }

    );

    return res.status(200).json({

      success: true,

      message:
        "Review deleted successfully",

    });

  }
);