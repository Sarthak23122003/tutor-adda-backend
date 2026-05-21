const express = require("express");

const router = express.Router();

const { protect } = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

const {
  createReview,
  getTutorReviews
} = require(
  "../controllers/reviewController"
);


// CREATE REVIEW
router.post(
  "/",
  protect,
  roleMiddleware("student"),
  createReview
);


// GET TUTOR REVIEWS
router.get(
  "/:tutorId",
  getTutorReviews
);

module.exports = router;