const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require('./routes'); // Adjust path to your routes folder

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Database Connection
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB connected");
	} catch (error) {
		console.error("Database connection failed:", error.message);
		process.exit(1); // Exit process with failure
	}
};

connectDB();

module.exports = app;
