const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validationMiddleware");

const { bookingSchema } = require("../validators/validationSchemas");

const {
  createBooking,
  getTutorBookings,
  acceptBooking,
  rejectBooking,
  getStudentBookings,
  cancelBooking,
  rescheduleBooking,
} = require("../controllers/bookingController");

// ======================================
// CREATE BOOKING
// ======================================
router.post(
  "/",
  protect,
  roleMiddleware("student"),
  validate(bookingSchema),
  createBooking
);

// ======================================
// GET TUTOR BOOKINGS
// ======================================
router.get(
  "/tutor",
  protect,
  roleMiddleware("tutor"),
  getTutorBookings
);

// ======================================
// ACCEPT BOOKING
// ======================================
router.put(
  "/:id/accept",
  protect,
  roleMiddleware("tutor"),
  acceptBooking
);

// ======================================
// REJECT BOOKING
// ======================================
router.put(
  "/:id/reject",
  protect,
  roleMiddleware("tutor"),
  rejectBooking
);

// ======================================
// CANCEL BOOKING
// ======================================
router.put(
  "/:id/cancel",
  protect,
  cancelBooking
);

// ======================================
// RESCHEDULE BOOKING
// ======================================
router.put(
  "/:id/reschedule",
  protect,
  rescheduleBooking
);

// ======================================
// STUDENT BOOKING HISTORY
// ======================================
router.get(
  "/student",
  protect,
  roleMiddleware("student"),
  getStudentBookings
);

module.exports = router;