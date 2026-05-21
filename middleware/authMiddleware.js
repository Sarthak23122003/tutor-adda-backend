const jwt = require("jsonwebtoken");

const User = require("../models/User");


// PROTECT ROUTES
const protect = async (req, res, next) => {

  let token;

  // Check token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Get user from DB
      req.user = await User.findById(decoded.id).select("-password");

      next();

    } catch (error) {

      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  // No token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};


module.exports = {
  protect,
};