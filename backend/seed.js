const dns = require("dns");
dns.setServers(["8.8.8.8"]);

require("dotenv").config();

const mongoose = require("mongoose");
const profile = require("./Models/profile");

const profiles = [
  {
    name: "Ananya",
    age: 24,
    lookingFor: "Bride",
    location: "Chennai",
    profession: "Software Engineer",
    about: "Simple, friendly and career-oriented.",
    email: "ananya@nammajodi.com",
  },
  {
    name: "Rahul",
    age: 27,
    lookingFor: "Groom",
    location: "Coimbatore",
    profession: "Business Professional",
    about: "Hardworking, friendly and enjoys spending time with family.",
    email: "rahul@nammajodi.com",
  },
  {
    name: "Priya",
    age: 25,
    lookingFor: "Bride",
    location: "Bangalore",
    profession: "Teacher",
    about: "Calm, caring and enjoys reading.",
    email: "priya@nammajodi.com",
  },
  {
    name: "Vikram",
    age: 29,
    lookingFor: "Groom",
    location: "Chennai",
    profession: "Marketing Specialist",
    about: "Outgoing, loves music and outdoor activities.",
    email: "vikram@nammajodi.com",
  },
  {
    name: "Banu",
    age: 20,
    lookingFor: "Bride",
    location: "Coimbatore",
    profession: "Student",
    about: "Fun-loving, enjoys movies and socializing.",
    email: "banu@nammajodi.com",
  },
  {
    name: "Arjun",
    age: 32,
    lookingFor: "Groom",
    location: "Bangalore",
    profession: "Entrepreneur",
    about: "Ambitious, enjoys sports and networking.",
    email: "arjun@nammajodi.com",
  },
  {
    name: "Meera",
    age: 28,
    lookingFor: "Bride",
    location: "Bangalore",
    profession: "Designer",
    about: "Creative, loves art and fashion.",
    email: "meera@nammajodi.com",
  },
  {
    name: "Karthik",
    age: 26,
    lookingFor: "Groom",
    location: "Chennai",
    profession: "Data Analyst",
    about: "Analytical, enjoys puzzles and problem-solving.",
    email: "karthik@nammajodi.com",
  },
  {
    name: "Sahana",
    age: 23,
    lookingFor: "Bride",
    location: "Coimbatore",
    profession: "Content Writer",
    about: "Expressive, loves writing and storytelling.",
    email: "sahana@nammajodi.com",
  },
  {
    name: "Keerthika",
    age: 21,
    lookingFor: "Bride",
    location: "Thirupur",
    profession: "Student",
    about: "Cheerful, enjoys music and dance.",
    email: "keerthika@nammajodi.com",
  },
  {
    name: "Rajesh",
    age: 30,
    lookingFor: "Groom",
    location: "Coimbatore",
    profession: "Business Professional",
    about: "Hardworking, friendly and enjoys spending time with family.",
    email: "rajesh@nammajodi.com",
  },
  {
    name: "Divya",
    age: 25,
    lookingFor: "Bride",
    location: "Bangalore",
    profession: "Teacher",
    about: "Calm, caring and enjoys reading.",
    email: "divya@nammajodi.com",
  },
  {
    name: "Manoj",
    age: 23,
    lookingFor: "Groom",
    location: "Pondicherry",
    profession: "Software Engineer",
    about: "Tech enthusiast loves coding and exploring new ideas.",
    email: "manoj@nammajodi.com",
  },
  {
    name: "Shalini",
    age: 24,
    lookingFor: "Bride",
    location: "Karaikal",
    profession: "Fashion Designer",
    about: "Stylish, creative and loves boutique collections.",
    email: "shalini@nammajodi.com",
  },
  {
    name: "Sara",
    age: 22,
    lookingFor: "Bride",
    location: "Bangalore",
    profession: "UI/UX Designer",
    about: "Trendy, creative and obsessed with aesthetics.",
    email: "sara@nammajodi.com",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully ✅");

    await Profile.deleteMany({});

    await Profile.insertMany(profiles);

    console.log("15 profiles added successfully ✅");

    await mongoose.connection.close();
  } catch (error) {
    console.log("Error ❌", error);
  }
};

seedDatabase();