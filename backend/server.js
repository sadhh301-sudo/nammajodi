const dns = require("dns");
const path = require("path");

dns.setServers(["8.8.8.8"]);

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const Profile = require("./Models/profile");

const app = express();

// ================================
// MIDDLEWARE
// ================================
app.use(cors());
app.use(express.json());

// ================================
// EMAIL SETUP
// ================================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================================
// TEST ROUTE
// ================================
app.get("/", (req, res) => {
  res.send("NammaJodi Backend is running ✅");
});

// ================================
// CONTACT API
// ================================
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `NammaJodi Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    res.status(200).json({
      message: "Message sent successfully ✅",
    });
  } catch (error) {
    console.error("Email sending failed:", error);

    res.status(500).json({
      message: "Failed to send message ❌",
      error: error.message,
    });
  }
});

// ================================
// CREATE PROFILE
// ================================
app.post("/api/profiles", async (req, res) => {
  try {
    const profile = new Profile(req.body);

    const savedProfile = await profile.save();

    res.status(201).json({
      message: "Profile created successfully ✅",
      profile: savedProfile,
    });
  } catch (error) {
    console.error("Profile creation error:", error);

    res.status(400).json({
      message: "Profile creation failed ❌",
      error: error.message,
    });
  }
});

// ================================
// GET ALL PROFILES
// ================================
app.get("/api/profiles", async (req, res) => {
  try {
    console.log(
      "Profile API called. MongoDB readyState:",
      mongoose.connection.readyState
    );

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "MongoDB is not connected ❌",
        readyState: mongoose.connection.readyState,
      });
    }

    const profiles = await Profile.find({}).lean();

    console.log("Profiles found:", profiles.length);

    res.status(200).json({
      profiles: profiles,
    });
  } catch (error) {
    console.error("Get profiles error:", error);

    res.status(500).json({
      message: "Failed to fetch profiles ❌",
      error: error.message,
    });
  }
});

// ================================
// GET SINGLE PROFILE
// ================================
app.get("/api/profiles/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).lean();

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found ❌",
      });
    }

    res.status(200).json({
      profile: profile,
    });
  } catch (error) {
    console.error("Get single profile error:", error);

    res.status(400).json({
      message: "Failed to fetch profile ❌",
      error: error.message,
    });
  }
});

// ================================
// UPDATE PROFILE
// ================================
app.put("/api/profiles/:id", async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedProfile) {
      return res.status(404).json({
        message: "Profile not found ❌",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully ✅",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(400).json({
      message: "Profile update failed ❌",
      error: error.message,
    });
  }
});

// ================================
// DELETE PROFILE
// ================================
app.delete("/api/profiles/:id", async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(
      req.params.id
    ).lean();

    if (!deletedProfile) {
      return res.status(404).json({
        message: "Profile not found ❌",
      });
    }

    res.status(200).json({
      message: "Profile deleted successfully ✅",
    });
  } catch (error) {
    console.error("Delete profile error:", error);

    res.status(400).json({
      message: "Profile deletion failed ❌",
      error: error.message,
    });
  }
});

// ================================
// MONGODB CONNECTION + SERVER
// ================================
mongoose.set("bufferCommands", false);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection ACTIVE ✅");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection DISCONNECTED ❌");
});

mongoose.connection.on("error", (error) => {
  console.log("MongoDB connection ERROR ❌");
  console.log(error.message);
});

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MongoDB connected successfully ✅");
    console.log(
      "MongoDB readyState:",
      mongoose.connection.readyState
    );

    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT,"0.0.0.0", () => {
      console.log(
        `NammaJodi Backend running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);
  });