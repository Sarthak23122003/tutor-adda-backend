const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const crypto = require("crypto");
const sendEmail = require(  "../utils/sendEmail");


// ======================================
// REGISTER USER
// ======================================
exports.registerUser = asyncHandler(
  async (req, res) => {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      const error = new Error(
        "User already exists"
      );

      error.statusCode = 400;

      throw error;
    }

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // GENERATE TOKEN
    const token =
      user.getSignedJwtToken();

    return res.status(201).json({
      success: true,

      message:
        "User registered successfully",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }

    });

  }
);


// ======================================
// LOGIN USER
// ======================================
exports.loginUser = asyncHandler(
  async (req, res) => {

    const {
      email,
      password
    } = req.body;

    // FIND USER
    const user = await User.findOne({
      email
    });

    if (!user) {

      const error = new Error(
        "Invalid email or password"
      );

      error.statusCode = 400;

      throw error;
    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      const error = new Error(
        "Invalid email or password"
      );

      error.statusCode = 400;

      throw error;
    }

    // GENERATE TOKEN
    const token =
      user.getSignedJwtToken();

    return res.status(200).json({
      success: true,

      message:
        "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }

    });

  }
);


// ======================================
// FORGOT PASSWORD
// ======================================
exports.forgotPassword = asyncHandler(
  async (req, res) => {

    const user = await User.findOne({
      email: req.body.email
    });

    if (!user) {

      const error = new Error(
        "User not found"
      );

      error.statusCode = 404;

      throw error;
    }

    // GENERATE RESET TOKEN
    const resetToken =
      user.getResetPasswordToken();

    await user.save({
      validateBeforeSave: false
    });

    // RESET URL
    const resetUrl =
      `http://localhost:3000/resetpassword/${resetToken}`;

    // EMAIL MESSAGE
    const message = `
You requested a password reset.

Reset your password using this link:

${resetUrl}

If you did not request this,
please ignore this email.
`;

    try {

      await sendEmail({

        email: user.email,

        subject:
          "Tutor Adda Password Reset",

        message,

      });

      return res.status(200).json({
        success: true,
        message:
          "Password reset email sent",
      });

    } catch (error) {

      user.resetPasswordToken =
        undefined;

      user.resetPasswordExpire =
        undefined;

      await user.save({
        validateBeforeSave: false
      });

      const customError =
        new Error(
          "Email could not be sent"
        );

      customError.statusCode = 500;

      throw customError;
    }

  }
);


// ======================================
// RESET PASSWORD
// ======================================
exports.resetPassword = asyncHandler(
  async (req, res) => {

    // HASH TOKEN
    const resetPasswordToken =
      crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    // FIND USER
    const user = await User.findOne({

      resetPasswordToken,

      resetPasswordExpire: {
        $gt: Date.now()
      }

    });

    if (!user) {

      const error = new Error(
        "Invalid or expired token"
      );

      error.statusCode = 400;

      throw error;
    }

    // UPDATE PASSWORD
    user.password =
      req.body.password;

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    await user.save();

    return res.status(200).json({
      success: true,

      message:
        "Password reset successful",

    });

  }
);