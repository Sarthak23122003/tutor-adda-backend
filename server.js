const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const dotenv = require('dotenv');
dotenv.config();

// Connect database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", userRoutes);
app.use("/api/tutors", require("./routes/tutorRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/reviews",require("./routes/reviewRoutes"));
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
// ======================================
// SECURITY MIDDLEWARE
// ======================================

// SECURE HTTP HEADERS
app.use(helmet());

// ENABLE CORS
app.use(cors());

// PREVENT NoSQL INJECTION
app.use(mongoSanitize());

// PREVENT XSS ATTACKS
app.use(xss());
app.use(errorHandler);
// RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
});

app.use(limiter);
// Test Route
app.get('/', (req, res) => {
  res.send('Tutar Adda API Running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});