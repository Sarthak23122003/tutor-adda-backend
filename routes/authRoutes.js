const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
} = require(
  "../controllers/authController"
);

const validate = require(
  "../middleware/validationMiddleware"
);

const {
  registerSchema,
  loginSchema
} = require(
  "../validators/validationSchemas"
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: student
 *     responses:
 *       201:
 *         description: User registered successfully
 */
// ======================================
// REGISTER
// ======================================
router.post(
  "/register",
  validate(registerSchema),
  registerUser
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
// ======================================
// LOGIN
// ======================================
router.post(
  "/login",
  validate(loginSchema),
  loginUser
);


// ======================================
// FORGOT PASSWORD
// ======================================
router.post(
  "/forgotpassword",
  forgotPassword
);


// ======================================
// RESET PASSWORD
// ======================================
router.put(
  "/resetpassword/:token",
  resetPassword
);


module.exports = router;