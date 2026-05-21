const Joi = require("joi");


// ======================================
// REGISTER VALIDATION
// ======================================
const registerSchema = Joi.object({

  name: Joi.string()
    .min(3)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .required(),

  role: Joi.string()
    .valid("student", "tutor")
    .required()

});


// ======================================
// LOGIN VALIDATION
// ======================================
const loginSchema = Joi.object({

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required()

});


// ======================================
// CREATE BOOKING VALIDATION
// ======================================
const bookingSchema = Joi.object({

  tutorId: Joi.string()
    .required(),

  subject: Joi.string()
    .required(),

  message: Joi.string()
    .allow(""),

  bookingDate: Joi.string()
    .required(),

  startTime: Joi.string()
    .required(),

  endTime: Joi.string()
    .required(),

  duration: Joi.number()
    .positive()
    .required()

});


module.exports = {
  registerSchema,
  loginSchema,
  bookingSchema
};