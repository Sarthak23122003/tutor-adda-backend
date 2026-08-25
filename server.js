const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
//const xss = require("xss-clean");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

dotenv.config();

// ======================================
// CONNECT DATABASE
// ======================================
connectDB();

const app = express();

// ======================================
// CORS CONFIGURATION
// ======================================
app.use(
  cors({
    origin: [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
  "http://localhost:5179",
  "http://localhost:5180",
],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ======================================
// SECURITY MIDDLEWARE
// ======================================
app.use(helmet());

//app.use(xss());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
});

app.use(limiter);

// ======================================
// BODY PARSER
// ======================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================
// COOKIE PARSER
// ======================================
app.use(cookieParser());

// ======================================
// LOGGER
// ======================================
app.use(morgan("dev"));

// ======================================
// ROUTES
// ======================================
app.get("/", (req, res) => {
  res.send("Tutor Adda API Running...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

// ======================================
// SWAGGER
// ======================================
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// ======================================
// ERROR HANDLER
// ======================================
app.use(errorHandler);

// ======================================
// START SERVER
// ======================================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("Listening Address:", server.address());
});

server.on("error", (err) => {
  console.log("SERVER ERROR:");
  console.log(err);
});