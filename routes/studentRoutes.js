const express = require("express");

const router = express.Router();

// CONTROLLERS
const {
  createStudentProfile,
  updateStudentProfile,
  getMyStudentProfile,
} = require("../controllers/studentController");

// MIDDLEWARES
const { protect } = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// CREATE STUDENT PROFILE
router.post(
  "/",
  protect,
  roleMiddleware("student"),
  createStudentProfile
);


// UPDATE STUDENT PROFILE
router.put(
  "/update",
  protect,
  roleMiddleware("student"),
  updateStudentProfile
);


// GET MY PROFILE
router.get(
  "/me",
  protect,
  roleMiddleware("student"),
  getMyStudentProfile
);

module.exports = router;