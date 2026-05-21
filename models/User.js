const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");


const userSchema = new mongoose.Schema(

  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "tutor", "admin"],
      default: "student",
    },

    // PASSWORD RESET FIELDS
    resetPasswordToken: String,

    resetPasswordExpire: Date,

  },

  {
    timestamps: true,
  }

);


// ======================================
// HASH PASSWORD BEFORE SAVE
// ======================================
userSchema.pre(
  "save",
  async function () {

    // ONLY HASH IF PASSWORD MODIFIED
    if (!this.isModified("password")) {
      return;
    }

    this.password = await bcrypt.hash(
      this.password,
      10
    );

  }
);

// ======================================
// MATCH PASSWORD
// ======================================
userSchema.methods.matchPassword =
async function (enteredPassword) {

  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};


// ======================================
// GENERATE JWT TOKEN
// ======================================
userSchema.methods.getSignedJwtToken =
function () {

  return jwt.sign(

    {
      id: this._id,
      role: this.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn:
        process.env.JWT_EXPIRE,
    }

  );
};


// ======================================
// GENERATE RESET PASSWORD TOKEN
// ======================================
userSchema.methods.getResetPasswordToken =
function () {

  // GENERATE TOKEN
  const resetToken =
    crypto.randomBytes(20)
      .toString("hex");

  // HASH TOKEN
  this.resetPasswordToken =
    crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

  // TOKEN EXPIRES IN 10 MINUTES
  this.resetPasswordExpire =
    Date.now() + 10 * 60 * 1000;

  return resetToken;
};


module.exports = mongoose.model(
  "User",
  userSchema
);