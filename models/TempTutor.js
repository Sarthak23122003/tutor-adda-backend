const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  subjects: [
    {
      type: String,
      required: true,
    }
  ],

  bio: {
    type: String,
    default: "",
  },

  experience: {
    type: Number,
    default: 0,
  },

  hourlyRate: {
    type: Number,
    default: 0,
  },

  city: {
    type: String,
    default: "",
  },

  teachingMode: {
    type: String,
    enum: ["online", "offline", "both"],
    default: "online",
  },

  availability: [
    {
      day: String,
      startTime: String,
      endTime: String,
    }
  ],

  profileImage: {
    type: String,
    default: "",
  },

  // ======================================
  // REVIEW FIELDS
  // ======================================
  averageRating: {
    type: Number,
    default: 0,
  },

  totalReviews: {
    type: Number,
    default: 0,
  }

},
{
  timestamps: true
});

module.exports = mongoose.model(
  "Tutor",
  tutorSchema
);