const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");
const validate = require("../middleware/validationMiddleware");

const {
  bookingSchema
} = require("../validators/validationSchemas");
const {
  createBooking,
  getTutorBookings,
  acceptBooking,
  rejectBooking,
  getStudentBookings,
  cancelBooking,
  rescheduleBooking,
} = require("../controllers/bookingController");

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create booking
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tutorId
 *               - subject
 *               - bookingDate
 *               - startTime
 *               - endTime
 *               - duration
 *             properties:
 *               tutorId:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               bookingDate:
 *                 type: string
 *                 example: 2026-05-25
 *               startTime:
 *                 type: string
 *                 example: 10:00
 *               endTime:
 *                 type: string
 *                 example: 11:00
 *               duration:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
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

/**
 * @swagger
 * /api/bookings/tutor:
 *   get:
 *     summary: Get tutor bookings
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tutor bookings fetched
 */
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
/**
 * @swagger
 * /api/bookings/student:
 *   get:
 *     summary: Get student bookings
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student bookings fetched
 */
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