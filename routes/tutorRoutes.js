const express = require("express");

const router = express.Router();

// CONTROLLERS
const {
  createTutorProfile,
  updateTutorProfile,
  getMyTutorProfile,
  getAllTutors,
  searchTutors,
  updateAvailability,
  addAvailability,
} = require("../controllers/tutorController");

// MIDDLEWARES
const { protect } = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

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
 *             required:
 *               - subjects
 *               - bio
 *               - experience
 *               - hourlyRate
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
 *               teachingMode:
 *                 type: string
 *                 example: online
 *     responses:
 *       201:
 *         description: Tutor profile created
 */
// CREATE TUTOR PROFILE
router.post(
  "/Profile",
  protect,
  roleMiddleware("tutor"),
  createTutorProfile
);


// UPDATE TUTOR PROFILE
router.put(
  "/update",
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


// SEARCH TUTORS
router.get("/search", searchTutors);


// GET ALL TUTORS
router.get("/", getAllTutors);

// UPDATE TUTOR AVAILABILITY
router.put(
  "/availability",
  protect,
  roleMiddleware("tutor"),
  updateAvailability
);
router.post(
  "/availability",
  protect,
  roleMiddleware("tutor"),
  addAvailability
);
module.exports = router;