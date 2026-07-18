const dns = require("dns");

// Fix MongoDB SRV DNS lookup issue
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Debug MongoDB URL
console.log("Mongo URL:", process.env.MONGO_URL);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("NOT CONNECTED TO NETWORK", err);
  });

// Routes
app.use("/", Routes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});