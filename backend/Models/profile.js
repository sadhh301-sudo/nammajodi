const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 18,
    },

    lookingFor: {
      type: String,
      required: true,
      enum: ["Bride", "Groom"],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    profession: {
      type: String,
      trim: true,
      default: "",
    },

    about: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;