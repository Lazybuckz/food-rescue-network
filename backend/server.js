// ============================================================================
// Food Rescue Network - Main Server File
// ============================================================================
// Description: Express.js server setup with middleware, routes, and database
//              connection for the Food Rescue Network application
// Author: Eric Obadjere
// Course: CS 665 - Introduction to Database Systems
// Date: November 2025
// ============================================================================

// Load environment variables from .env file
require("dotenv").config();

// Import required dependencies
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

// Import route handlers
const authRoutes = require("./routes/auth");
const donorsRoutes = require("./routes/donors");
const volunteersRoutes = require("./routes/volunteers");
const donationsRoutes = require("./routes/donations");

// ============================================================================
// SERVER CONFIGURATION
// ============================================================================

// Initialize Express application
const app = express();

// Set server port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// ============================================================================
// DATABASE CONNECTION
// ============================================================================

// Create PostgreSQL connection pool
// Using pool for better performance with multiple concurrent requests
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Test database connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error(" Error connecting to database:", err.stack);
  } else {
    console.log(" Connected to PostgreSQL database");
    release(); // Release client back to pool
  }
});

// Export pool for use in route handlers
module.exports = { pool };

// ============================================================================
// MIDDLEWARE SETUP
// ============================================================================

// CORS Configuration
// Allows frontend (running on port 3000) to communicate with backend (port 5000)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Body Parser Middleware
// Parses incoming JSON request bodies (e.g., from POST/PUT requests)
app.use(express.json());

// Request Logging Middleware (Development Only)
// Logs all incoming requests for debugging purposes
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// ============================================================================
// ROUTES
// ============================================================================

// Health Check Endpoint
// Simple endpoint to verify server is running
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Food Rescue Network API is running",
    timestamp: new Date().toISOString(),
  });
});

// Authentication Routes
// Handles user registration and login
// Routes: POST /api/auth/register, POST /api/auth/login
app.use("/api/auth", authRoutes);

// Donor Management Routes
// CRUD operations for food donor businesses
// Routes: GET/POST /api/donors, GET/PUT/DELETE /api/donors/:id
app.use("/api/donors", donorsRoutes);

// Volunteer Management Routes
// CRUD operations for volunteer drivers
// Routes: GET/POST /api/volunteers, GET/PUT/DELETE /api/volunteers/:id
app.use("/api/volunteers", volunteersRoutes);

// Food Donation Routes
// Manages food donation listings and statistics
// Routes: GET/POST /api/donations, GET /api/donations/stats
app.use("/api/donations", donationsRoutes);

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 Handler - Catch all undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// Global Error Handler
// Catches any errors thrown in route handlers
app.use((err, req, res, next) => {
  console.error(" Server Error:", err.stack);

  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ============================================================================
// START SERVER
// ============================================================================

// Start Express server and listen on specified port
app.listen(PORT, () => {
  console.log("============================================");
  console.log("  Food Rescue Network API Server");
  console.log("============================================");
  console.log(` Server running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(` API Base URL: http://localhost:${PORT}/api`);
  console.log(` Health Check: http://localhost:${PORT}/api/health`);
  console.log("============================================");
});

// Graceful Shutdown Handler
// Properly closes database connections when server stops
process.on("SIGTERM", () => {
  console.log("  SIGTERM signal received: closing HTTP server");
  pool.end(() => {
    console.log(" Database pool closed");
    process.exit(0);
  });
});

// ============================================================================
// END OF FILE
// ============================================================================
