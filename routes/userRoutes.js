const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");


// Protected Route
router.get("/profile", protect, (req, res) => {

  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });

});

module.exports = router;