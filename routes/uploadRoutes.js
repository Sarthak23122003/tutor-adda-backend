const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const { protect } = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const {
  uploadTutorImage,
} = require("../controllers/uploadController");


// UPLOAD TUTOR PROFILE IMAGE
router.post(
  "/tutor/profile-image",
  protect,
  roleMiddleware("tutor"),
  upload.single("image"),
  uploadTutorImage
);

module.exports = router;