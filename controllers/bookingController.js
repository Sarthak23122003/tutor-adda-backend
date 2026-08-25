const Booking = require("../models/Booking");
const Tutor = require("../models/Tutor");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");


// ======================================
// CREATE BOOKING
// ======================================
exports.createBooking = asyncHandler(
  async (req, res) => {

    const studentId = req.user.id;

    const {
      tutorId,
      subject,
      message,
      bookingDate,
      startTime,
      endTime,
      duration,
    } = req.body;
    console.log("========== CREATE BOOKING ==========");
console.log("Request Body:", req.body);
console.log("Student ID:", req.user.id);

    // CHECK TUTOR EXISTS
    const tutorUser = await User.findById(tutorId);

    if (!tutorUser || tutorUser.role !== "tutor") {
      const error = new Error("Tutor not found");
      error.statusCode = 404;
      throw error;
    }

    // FIND TUTOR PROFILE
    const tutorProfile = await Tutor.findOne({
      user: tutorId,
    });

    if (!tutorProfile) {
      const error = new Error("Tutor profile not found");
      error.statusCode = 404;
      throw error;
    }

    // GET DAY NAME
    //const dayName = new Date(
      //bookingDate
    //).toLocaleDateString(
      //"en-US",
      //{ weekday: "long" }
    //);

    // CHECK AVAILABILITY
    //const availableSlot =
      //tutorProfile.availability.find(
        //(slot) =>
          //slot.day === dayName &&
          //startTime >= slot.startTime &&
          //endTime <= slot.endTime
      //);

    //if (!availableSlot) {
      //const error = new Error(
        //"Tutor not available at requested time"
      //);
      //error.statusCode = 400;
      //throw error;
    //}

    // CHECK OVERLAPPING BOOKINGS
    // TEMPORARILY DISABLED AVAILABILITY CHECK

// const existingBooking =
//       await Booking.findOne({

//         tutor: tutorId,

//         bookingDate,

//         status: {
//           $in: ["pending", "accepted"]
//         },

//         $or: [
//           {
//             startTime: { $lt: endTime },
//             endTime: { $gt: startTime }
//           }
//         ]
//       });

// if (existingBooking) {
//   const error = new Error(
//     "Time slot already booked"
//   );
//   error.statusCode = 400;
//   throw error;
// }

    // CREATE BOOKING
    const booking = await Booking.create({
      student: studentId,
      tutor: tutorId,
      subject,
      message,
      bookingDate,
      startTime,
      endTime,
      duration,
    });

    return res.status(201).json({
      success: true,
      message: "Booking request sent successfully",
      booking,
    });

  }
);


// ======================================
// GET TUTOR BOOKINGS
// ======================================
exports.getTutorBookings = asyncHandler(
  async (req, res) => {

    const tutorId = req.user.id;

    const bookings = await Booking.find({
      tutor: tutorId,
    })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  }
);


// ======================================
// ACCEPT BOOKING
// ======================================
exports.acceptBooking = asyncHandler(
  async (req, res) => {

    const tutorId = req.user.id;

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    // VERIFY OWNERSHIP
    if (
      booking.tutor.toString() !== tutorId
    ) {
      const error = new Error("Access denied");
      error.statusCode = 403;
      throw error;
    }

    booking.status = "accepted";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking accepted",
      booking,
    });

  }
);


// ======================================
// REJECT BOOKING
// ======================================
exports.rejectBooking = asyncHandler(
  async (req, res) => {

    const tutorId = req.user.id;

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    // VERIFY OWNERSHIP
    if (
      booking.tutor.toString() !== tutorId
    ) {
      const error = new Error("Access denied");
      error.statusCode = 403;
      throw error;
    }

    booking.status = "rejected";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking rejected",
      booking,
    });

  }
);


// ======================================
// CANCEL BOOKING
// ======================================
exports.cancelBooking = asyncHandler(
  async (req, res) => {

    const userId = req.user.id;

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    const isStudent =
      booking.student.toString() === userId;

    const isTutor =
      booking.tutor.toString() === userId;

    if (!isStudent && !isTutor) {
      const error = new Error("Access denied");
      error.statusCode = 403;
      throw error;
    }

    if (
      booking.status === "rejected" ||
      booking.status === "cancelled"
    ) {
      const error = new Error(
        `Booking already ${booking.status}`
      );
      error.statusCode = 400;
      throw error;
    }

    booking.status = "cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });

  }
);


// ======================================
// RESCHEDULE BOOKING
// ======================================
exports.rescheduleBooking = asyncHandler(
  async (req, res) => {

    const userId = req.user.id;

    const {
      bookingDate,
      startTime,
      endTime
    } = req.body;

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    const isStudent =
      booking.student.toString() === userId;

    const isTutor =
      booking.tutor.toString() === userId;

    if (!isStudent && !isTutor) {
      const error = new Error("Access denied");
      error.statusCode = 403;
      throw error;
    }

    if (
      booking.status === "cancelled" ||
      booking.status === "rejected"
    ) {
      const error = new Error(
        `Cannot reschedule ${booking.status} booking`
      );
      error.statusCode = 400;
      throw error;
    }

    // FIND TUTOR PROFILE
    const tutorProfile = await Tutor.findOne({
      user: booking.tutor
    });

    if (!tutorProfile) {
      const error = new Error(
        "Tutor profile not found"
      );
      error.statusCode = 404;
      throw error;
    }

    // GET DAY
   // const dayName = new Date(
     // bookingDate
    //).toLocaleDateString(
      //"en-US",
      //{ weekday: "long" }
    //);

    // CHECK AVAILABILITY
    // TEMPORARILY DISABLED AVAILABILITY CHECK
    // const availableSlot =
    //   tutorProfile.availability.find(
    //     (slot) =>
    //       slot.day === dayName &&
    //       startTime >= slot.startTime &&
    //       endTime <= slot.endTime
     // );

    // if (!availableSlot) {
    //   const error = new Error(
    //     "Tutor unavailable for new slot"
    //   );
    //   error.statusCode = 400;
    //   throw error;
    //}

    // CHECK CONFLICTS
    const conflictingBooking =
      await Booking.findOne({

        _id: { $ne: booking._id },

        tutor: booking.tutor,

        bookingDate,

        status: {
          $in: ["pending", "accepted"]
        },

        $or: [
          {
            startTime: { $lt: endTime },
            endTime: { $gt: startTime }
          }
        ]
      });

    if (conflictingBooking) {
      const error = new Error(
        "New slot already booked"
      );
      error.statusCode = 400;
      throw error;
    }

    // UPDATE BOOKING
    booking.bookingDate = bookingDate;
    booking.startTime = startTime;
    booking.endTime = endTime;

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking rescheduled successfully",
      booking,
    });

  }
);


// ======================================
// STUDENT BOOKING HISTORY
// ======================================
// ======================================
// STUDENT BOOKING HISTORY
// ======================================
exports.getStudentBookings = asyncHandler(async (req, res) => {

  console.log("\n========== STUDENT BOOKINGS ==========");
  console.log("Logged In User:");
  console.log(req.user);

  const studentId = req.user.id;

  console.log("Student ID:", studentId);

  const bookings = await Booking.find({
    student: studentId,
  })
    .populate("tutor", "name email")
    .sort({ createdAt: -1 });

  console.log("Bookings Found:", bookings.length);
  console.log(bookings);

  return res.status(200).json({
    success: true,
    count: bookings.length,
    bookings,
  });

});