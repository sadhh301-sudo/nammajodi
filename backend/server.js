const dns = require("dns");
dns.setServers(["8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const Profile = require("./Models/profile");

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  },
});

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");
  })
  .catch((error) => {
    console.log("MongoDB connection failed ❌", error);
  });

// Test route
app.get("/", (req, res) => {
  res.send("NammaJodi Backend is running ✅");
});

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
    });
  }
});

// CREATE PROFILE
app.post("/api/profiles", async (req, res) => {
  try {
    const profile = new Profile(req.body);

    const savedProfile = await profile.save();

    res.status(201).json({
      message: "Profile created successfully ✅",
      profile: savedProfile,
    });
  } catch (error) {
    res.status(400).json({
      message: "Profile creation failed ❌",
      error: error.message,
    });
  }
});

// READ ALL PROFILES
app.get("/api/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find();

    res.status(200).json({
      profiles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profiles ❌",
      error: error.message,
    });
  }
});

// READ ONE PROFILE
app.get("/api/profiles/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found ❌",
      });
    }

    res.status(200).json({
      profile,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch profile ❌",
      error: error.message,
    });
  }
});

// UPDATE PROFILE
app.put("/api/profiles/:id", async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

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
    res.status(400).json({
      message: "Profile update failed ❌",
      error: error.message,
    });
  }
});

// DELETE PROFILE
app.delete("/api/profiles/:id", async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProfile) {
      return res.status(404).json({
        message: "Profile not found ❌",
      });
    }

    res.status(200).json({
      message: "Profile deleted successfully ✅",
    });
  } catch (error) {
    res.status(400).json({
      message: "Profile deletion failed ❌",
      error: error.message,
    });
  }
});

// START SERVER
app.listen(5000, () => {
  console.log("NammaJodi Backend running on http://localhost:5000");
});