const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const Routes = require("./routes/route.js");

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Port
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

// Routes
app.use("/", Routes);

// Default Route
app.get("/", (req, res) => {
  res.send("School Management System API is Running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
