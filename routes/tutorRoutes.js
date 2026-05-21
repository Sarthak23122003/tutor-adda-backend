const express = require("express");

const router = express.Router();

// CONTROLLERS
const {
  createTutorProfile,
  updateTutorProfile,
  getMyTutorProfile,
  getAllTutors,
  getSingleTutor,
  updateAvailability,
  addAvailability,
} = require("../controllers/tutorController");

// MIDDLEWARES
const {
  protect,
} = require("../middleware/authMiddleware");

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);


/**
 * @swagger
 * /api/tutors/profile:
 *   post:
 *     summary: Create tutor profile
 *     tags:
 *       - Tutors
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *               bio:
 *                 type: string
 *               experience:
 *                 type: number
 *               hourlyRate:
 *                 type: number
 *               city:
 *                 type: string
 *               teachingMode:
 *                 type: string
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Tutor profile created
 */


// ======================================
// PUBLIC ROUTES
// ======================================

// GET ALL TUTORS
router.get("/", getAllTutors);

// GET SINGLE TUTOR
router.get("/:id", getSingleTutor);


// ======================================
// PRIVATE ROUTES
// ======================================

// CREATE TUTOR PROFILE
router.post(
  "/profile",
  protect,
  roleMiddleware("tutor"),
  createTutorProfile
);

// UPDATE TUTOR PROFILE
router.put(
  "/profile",
  protect,
  roleMiddleware("tutor"),
  updateTutorProfile
);

// GET MY PROFILE
router.get(
  "/me",
  protect,
  roleMiddleware("tutor"),
  getMyTutorProfile
);

// ADD AVAILABILITY
router.post(
  "/availability",
  protect,
  roleMiddleware("tutor"),
  addAvailability
);

// UPDATE AVAILABILITY
router.put(
  "/availability",
  protect,
  roleMiddleware("tutor"),
  updateAvailability
);

module.exports = router;