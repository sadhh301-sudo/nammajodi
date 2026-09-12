"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const profiles = [
  {
    id: 1,
    name: "Ananya",
    gender: "Female",
    age: 25,
    image: "/Public/Ananya.jpg",
    location: "Chennai",
    profession: "Software Engineer",
    about:
      "A friendly and ambitious person who enjoys learning new things and spending time with family.",
  },
  {
    id: 2,
    name: "Rahul",
    gender: "Male",
    age: 28,
    image: "/Public/Rahul.jpg",
    location: "Coimbatore",
    profession: "Business Professional",
    about:
      "A responsible and positive person who enjoys travelling and exploring new places.",
  },
  {
    id: 3,
    name: "Priya",
    gender: "Female",
    age: 26,
    image: "/Public/Priya.jpg",
    location: "Bangalore",
    profession: "UI/UX Designer",
    about:
      "Creative and cheerful, with an interest in design, music and family activities.",
  },
  {
    id: 4,
    name: "Vikram",
    gender: "Male",
    age: 30,
    image: "/Public/Vikram.jpg",
    location: "Chennai",
    profession: "Project Manager",
    about:
      "Calm and hardworking person who values family, career and personal growth.",
  },
  {
    id: 5,
    name: "Banu",
    gender: "Female",
    age: 24,
    image: "/Public/Banu.jpg",
    location: "Madurai",
    profession: "Teacher",
    about:
      "Simple and caring person who enjoys reading, travelling and spending time with family.",
  },
  {
    id: 6,
    name: "Arjun",
    gender: "Male",
    age: 29,
    image: "/Public/Arjun.jpg",
    location: "Coimbatore",
    profession: "Software Developer",
    about:
      "Friendly and career-focused person who enjoys technology and outdoor activities.",
  },
  {
    id: 7,
    name: "Meera",
    gender: "Female",
    age: 27,
    image: "/Public/Meera.jpg",
    location: "Chennai",
    profession: "HR Professional",
    about:
      "Positive and friendly person who enjoys music, travelling and spending time with loved ones.",
  },
  {
    id: 8,
    name: "Karthik",
    gender: "Male",
    age: 31,
    image: "/Public/Karthik.jpg",
    location: "Bangalore",
    profession: "Business Analyst",
    about:
      "Responsible and easy-going person with an interest in business and technology.",
  },
  {
    id: 9,
    name: "Sahana",
    gender: "Female",
    age: 25,
    image: "/Public/Sahana.jpg",
    location: "Coimbatore",
    profession: "Doctor",
    about:
      "Kind and hardworking person who enjoys helping others and spending time with family.",
  },
  {
    id: 10,
    name: "Keerthika",
    gender: "Female",
    age: 26,
    image: "/Public/Keerthi.jpg",
    location: "Chennai",
    profession: "Software Engineer",
    about:
      "Cheerful and ambitious person who enjoys travelling, music and learning new things.",
  },
  {
    id: 11,
    name: "Rajesh",
    gender: "Male",
    age: 32,
    image: "/Public/Rajesh.jpg",
    location: "Madurai",
    profession: "Civil Engineer",
    about:
      "Hardworking and family-oriented person who enjoys sports and travelling.",
  },
  {
    id: 12,
    name: "Divya",
    gender: "Female",
    age: 28,
    image: "/Public/Divya.jpg",
    location: "Bangalore",
    profession: "Marketing Professional",
    about:
      "Creative and confident person who enjoys photography, travelling and music.",
  },
  {
    id: 13,
    name: "Manoj",
    gender: "Male",
    age: 29,
    image: "/Public/Manoj.jpg",
    location: "Coimbatore",
    profession: "Entrepreneur",
    about:
      "Positive and ambitious person who enjoys business, fitness and travelling.",
  },
  {
    id: 14,
    name: "Shalini",
    gender: "Female",
    age: 27,
    image: "/Public/Shalini.jpg",
    location: "Chennai",
    profession: "Content Writer",
    about:
      "Creative and calm person who enjoys writing, reading and spending time with family.",
  },
  {
    id: 15,
    name: "Sara",
    gender: "Female",
    age: 25,
    image: "/Public/Sara.jpg",
    location: "Bangalore",
    profession: "Data Analyst",
    about:
      "Friendly and curious person who enjoys technology, travelling and learning.",
  },
];

type DbProfile = {
  _id: string;
  name: string;
  age: number;
  lookingFor: string;
  location: string;
  profession: string;
  about: string;
  email: string;
};

export default function ProfileDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const own = searchParams.get("own");
  const mongo = searchParams.get("mongo");

  const [savedProfile, setSavedProfile] = useState<any>(null);
  const [mongoProfile, setMongoProfile] = useState<DbProfile | null>(null);
  const [loading, setLoading] = useState(false);

  // Get logged-in user's profile
  useEffect(() => {
    if (own === "true") {
      const storedProfile =
        localStorage.getItem("nammajodiProfile");

      if (storedProfile) {
        setSavedProfile(JSON.parse(storedProfile));
      }
    }
  }, [own]);

  // Get MongoDB profile
  useEffect(() => {
    if (mongo === "true" && id) {
      const fetchProfile = async () => {
        try {
          setLoading(true);

          const response = await fetch(
            `http://localhost:5000/api/profiles/${id}`
          );

          const data = await response.json();

          if (response.ok) {
            setMongoProfile(data.profile);
          }
        } catch (error) {
          console.log("Failed to fetch profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [mongo, id]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    window.location.href = "/login";
  };

  const imageMap: Record<string, string> = {
    Ananya: "/Public/Ananya.jpg",
    Rahul: "/Public/Rahul.jpg",
    Priya: "/Public/Priya.jpg",
    Vikram: "/Public/Vikram.jpg",
    Banu: "/Public/Banu.jpg",
    Arjun: "/Public/Arjun.jpg",
    Meera: "/Public/Meera.jpg",
    Karthik: "/Public/Karthik.jpg",
    Sahana: "/Public/Sahana.jpg",
    Keerthika: "/Public/Keerthi.jpg",
    Rajesh: "/Public/Rajesh.jpg",
    Divya: "/Public/Divya.jpg",
    Manoj: "/Public/Manoj.jpg",
    Shalini: "/Public/Shalini.jpg",
    Sara: "/Public/Sara.jpg",
  };

  // Navbar
  const Navbar = () => (
    <nav className="sticky top-0 z-50 border-b bg-white/95 px-5 py-4 shadow-sm backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        <button
          onClick={() => router.push("/")}
          className="text-xl font-bold text-pink-600 md:text-2xl"
        >
          💍 NammaJodi
        </button>

        <div className="hidden items-center gap-7 md:flex">

          <button
            onClick={() => router.push("/")}
            className="font-medium text-gray-700 hover:text-pink-600"
          >
            Home
          </button>

          <button
            onClick={() => router.push("/matches")}
            className="font-medium text-gray-700 hover:text-pink-600"
          >
            Matches
          </button>

          <button
            onClick={() => (window.location.href = "/about")}
            className="font-medium text-gray-700 hover:text-pink-600"
          >
            About
          </button>

          <button
            onClick={() => (window.location.href = "/contact")}
            className="font-medium text-gray-700 hover:text-pink-600"
          >
            Contact
          </button>

        </div>

        <button
          onClick={handleLogout}
          className="rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700"
        >
          Logout
        </button>

      </div>
    </nav>
  );

  // ==================================================
  // OWN PROFILE
  // ==================================================

  if (own === "true") {
    if (!savedProfile) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50">

          <div className="text-center">

            <div className="text-5xl">👤</div>

            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              Profile not found
            </h1>

            <button
              onClick={() => router.push("/profile")}
              className="mt-5 rounded-full bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
            >
              Create Profile
            </button>

          </div>

        </main>
      );
    }

    const ownImage = imageMap[savedProfile.name];

    return (
      <main className="min-h-screen bg-slate-50">

        <Navbar />

        {/* Hero */}
        <section className="bg-gradient-to-br from-pink-100 via-white to-purple-100 px-5 py-14 md:px-10 md:py-20">

          <div className="mx-auto max-w-5xl">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
              Your Profile
            </p>

            <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              My Profile
            </h1>

            <p className="mt-4 text-gray-600">
              View and manage your NammaJodi profile information.
            </p>

          </div>

        </section>

        {/* Profile */}
        <section className="px-5 py-10 md:px-10">

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

            {/* Header */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-7 md:p-10">

              <div className="flex flex-col items-center gap-6 md:flex-row">

                {ownImage ? (
                  <img
                    src={ownImage}
                    alt={savedProfile.name}
                    className="h-36 w-36 rounded-2xl object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-white text-6xl shadow-md">
                    👤
                  </div>
                )}

                <div className="text-center md:text-left">

                  <span className="rounded-full bg-pink-600 px-3 py-1 text-xs font-bold text-white">
                    MY PROFILE
                  </span>

                  <h2 className="mt-3 text-3xl font-bold text-gray-900">
                    {savedProfile.name}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {savedProfile.age} years
                    {" • "}
                    {savedProfile.location}
                  </p>

                </div>

              </div>

            </div>

            {/* Details */}
            <div className="grid gap-5 p-7 md:grid-cols-2 md:p-10">

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Age
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {savedProfile.age} years
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Looking For
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {savedProfile.lookingFor}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  📍 {savedProfile.location}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Profession
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  💼 {savedProfile.profession || "Not specified"}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5 md:col-span-2">
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  📧 {savedProfile.email}
                </p>
              </div>

            </div>

            {/* About */}
            <div className="px-7 pb-7 md:px-10 md:pb-10">

              <div className="rounded-2xl border border-gray-100 p-6">

                <h3 className="text-lg font-bold text-gray-900">
                  About Me
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {savedProfile.about ||
                    "No description added yet."}
                </p>

              </div>

            </div>

            {/* Buttons */}
            <div className="border-t bg-gray-50 p-7 md:p-10">

              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  onClick={() => router.push("/profile")}
                  className="flex-1 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
                >
                  ✏️ Edit Profile
                </button>

                <button
                  onClick={() => router.push("/matches")}
                  className="flex-1 rounded-xl border border-pink-600 px-6 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
                >
                  ← Back to Matches
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* Footer */}
        <footer className="border-t bg-white px-5 py-10 md:px-10">

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">

            <div>

              <h3 className="text-xl font-bold text-pink-600">
                💍 NammaJodi
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                A simple and professional platform to create
                profiles and discover suitable matches.
              </p>

            </div>

            <div>

              <h4 className="font-semibold text-gray-900">
                Quick Links
              </h4>

              <div className="mt-3 space-y-2 text-sm text-gray-500">

                <button
                  onClick={() => router.push("/")}
                  className="block hover:text-pink-600"
                >
                  Home
                </button>

                <button
                  onClick={() => router.push("/matches")}
                  className="block hover:text-pink-600"
                >
                  Matches
                </button>

                <button
                  onClick={() => (window.location.href = "/about")}
                  className="block hover:text-pink-600"
                >
                  About
                </button>

                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="block hover:text-pink-600"
                >
                  Contact
                </button>

              </div>

            </div>

            <div>

              <h4 className="font-semibold text-gray-900">
                Contact
              </h4>

              <div className="mt-3 space-y-2 text-sm text-gray-500">

                <p>📧 support@nammajodi.com</p>

                <p>📞 +91 98765 43210</p>

                <p>📍 Tamil Nadu, India</p>

              </div>

            </div>

          </div>

          <div className="mx-auto mt-8 max-w-6xl border-t pt-6 text-center text-sm text-gray-400">
            © 2026 NammaJodi. All rights reserved.
          </div>

        </footer>

      </main>
    );
  }

  // ==================================================
  // MONGODB PROFILE
  // ==================================================

  if (mongo === "true") {

    if (loading) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50">

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600"></div>

            <p className="mt-4 font-medium text-gray-600">
              Loading profile...
            </p>

          </div>

        </main>
      );
    }

    if (!mongoProfile) {
      return (
        <main className="min-h-screen bg-slate-50">

          <Navbar />

          <section className="flex min-h-[70vh] items-center justify-center px-5">

            <div className="text-center">

              <div className="text-5xl">🔍</div>

              <h1 className="mt-4 text-2xl font-bold text-gray-900">
                Profile not found
              </h1>

              <p className="mt-2 text-gray-500">
                This profile could not be found.
              </p>

              <button
                onClick={() => router.push("/matches")}
                className="mt-6 rounded-full bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
              >
                ← Back to Matches
              </button>

            </div>

          </section>

        </main>
      );
    }

    const profileImage = imageMap[mongoProfile.name];

    return (
      <main className="min-h-screen bg-slate-50">

        <Navbar />

        {/* Hero */}
        <section className="bg-gradient-to-br from-pink-100 via-white to-purple-100 px-5 py-14 md:px-10 md:py-20">

          <div className="mx-auto max-w-6xl">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
              Profile Details
            </p>

            <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
              {mongoProfile.name}
            </h1>

            <p className="mt-3 text-gray-600">
              Explore this profile and learn more.
            </p>

          </div>

        </section>

        {/* Main Profile */}
        <section className="px-5 py-10 md:px-10">

          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-sm">

            {/* Profile Header */}
            <div className="grid gap-8 p-7 md:grid-cols-[320px_1fr] md:p-10">

              <div>

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={mongoProfile.name}
                    className="h-80 w-full rounded-3xl object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-80 w-full items-center justify-center rounded-3xl bg-pink-50 text-7xl">
                    👤
                  </div>
                )}

              </div>

              <div className="flex flex-col justify-center">

                <span className="w-fit rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-pink-600">
                  {mongoProfile.lookingFor}
                </span>

                <h2 className="mt-4 text-4xl font-bold text-gray-900">
                  {mongoProfile.name}
                </h2>

                <p className="mt-3 text-lg text-gray-500">
                  {mongoProfile.age} years
                  {" • "}
                  {mongoProfile.location}
                </p>

                <p className="mt-5 text-gray-600">
                  {mongoProfile.profession ||
                    "Profession not specified"}
                    </p>

              </div>

            </div>

            {/* Details */}
            <div className="grid gap-5 px-7 pb-8 md:grid-cols-2 md:px-10">

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Age
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {mongoProfile.age} years
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  📍 {mongoProfile.location}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Profession
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  💼{" "}
                  {mongoProfile.profession ||
                    "Not specified"}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Looking For
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {mongoProfile.lookingFor}
                </p>
              </div>

            </div>

            {/* About */}
            <div className="px-7 pb-8 md:px-10">

              <div className="rounded-2xl border border-gray-100 p-6">

                <h3 className="text-lg font-bold text-gray-900">
                  About
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {mongoProfile.about ||
                    "No description available."}
                </p>

              </div>

            </div>

            {/* Contact */}
            <div className="px-7 pb-8 md:px-10">

              <div className="rounded-2xl border border-gray-100 p-6">

                <h3 className="text-lg font-bold text-gray-900">
                  Contact Information
                </h3>

                <p className="mt-3 text-gray-600">
                  📧 {mongoProfile.email}
                </p>

              </div>

            </div>

            {/* Back Button */}
            <div className="border-t bg-gray-50 p-7 md:p-10">

              <button
                onClick={() => router.push("/matches")}
                className="w-full rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700 sm:w-auto"
              >
                ← Back to Matches
              </button>

            </div>

          </div>

        </section>

        {/* Footer */}
        <footer className="border-t bg-white px-5 py-10 md:px-10">

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">

            <div>

              <h3 className="text-xl font-bold text-pink-600">
                💍 NammaJodi
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                A simple and professional platform to create
                profiles and discover suitable matches.
              </p>

            </div>

            <div>

              <h4 className="font-semibold text-gray-900">
                Quick Links
              </h4>

              <div className="mt-3 space-y-2 text-sm text-gray-500">

                <button
                  onClick={() => router.push("/")}
                  className="block hover:text-pink-600"
                >
                  Home
                </button>

                <button
                  onClick={() => router.push("/matches")}
                  className="block hover:text-pink-600"
                >
                  Matches
                </button>

                <button
                  onClick={() =>
                    (window.location.href = "/about")
                  }
                  className="block hover:text-pink-600"
                >
                  About
                </button>

                <button
                  onClick={() =>
                    (window.location.href = "/contact")
                  }
                  className="block hover:text-pink-600"
                >
                  Contact
                </button>

              </div>

            </div>

            <div>

              <h4 className="font-semibold text-gray-900">
                Contact
              </h4>

              <div className="mt-3 space-y-2 text-sm text-gray-500">

                <p>📧 support@nammajodi.com</p>

                <p>📞 +91 98765 43210</p>

                <p>📍 Tamil Nadu, India</p>

              </div>

            </div>

          </div>

          <div className="mx-auto mt-8 max-w-6xl border-t pt-6 text-center text-sm text-gray-400">
            © 2026 NammaJodi. All rights reserved.
          </div>

        </footer>

      </main>
    );
  }

  // =========================
  // STATIC PROFILE
  // =========================

  const staticProfile = profiles.find(
    (profile) => profile.id === Number(id)
  );

  if (!staticProfile) {
    return (
      <main className="min-h-screen bg-slate-50">

        <Navbar />

        <section className="flex min-h-[70vh] items-center justify-center px-5">

          <div className="text-center">

            <div className="text-5xl">🔍</div>

            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Profile not found
            </h1>

            <button
              onClick={() => router.push("/matches")}
              className="mt-6 rounded-full bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
            >
              ← Back to Matches
            </button>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-100 via-white to-purple-100 px-5 py-14 md:px-10 md:py-20">

        <div className="mx-auto max-w-6xl">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
            Profile Details
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            {staticProfile.name}
          </h1>

          <p className="mt-3 text-gray-600">
            Get to know more about this profile.
          </p>

        </div>

      </section>

      {/* Profile Card */}
      <section className="px-5 py-10 md:px-10">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-sm">

          <div className="grid gap-8 p-7 md:grid-cols-[320px_1fr] md:p-10">

            <img
              src={staticProfile.image}
              alt={staticProfile.name}
              className="h-80 w-full rounded-3xl object-cover shadow-md"
            />

            <div className="flex flex-col justify-center">

              <span className="w-fit rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-pink-600">
                {staticProfile.gender}
              </span>

              <h2 className="mt-4 text-4xl font-bold text-gray-900">
                {staticProfile.name}
              </h2>

              <p className="mt-3 text-lg text-gray-500">
                {staticProfile.age} years
                {" • "}
                {staticProfile.location}
              </p>

              <p className="mt-5 text-gray-600">
                {staticProfile.profession}
              </p>

            </div>

          </div>

          {/* Details */}
          <div className="grid gap-5 px-7 pb-8 md:grid-cols-2 md:px-10">

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Gender
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                {staticProfile.gender}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Age
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                {staticProfile.age} years
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                📍 {staticProfile.location}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Profession
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                💼 {staticProfile.profession}
              </p>
            </div>

          </div>

          {/* About */}
          <div className="px-7 pb-8 md:px-10">

            <div className="rounded-2xl border border-gray-100 p-6">

              <h3 className="text-lg font-bold text-gray-900">
                About
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                {staticProfile.about}
              </p>

            </div>

          </div>

          {/* Back */}
          <div className="border-t bg-gray-50 p-7 md:p-10">

            <button
              onClick={() => router.push("/matches")}
              className="w-full rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700 sm:w-auto"
            >
              ← Back to Matches
            </button>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t bg-white px-5 py-10 md:px-10">

        <div className="mx-auto max-w-6xl text-center">

          <h3 className="text-xl font-bold text-pink-600">
            💍 NammaJodi
          </h3>

          <p className="mt-3 text-sm text-gray-500">
            Simple. Professional. Easy to use.
          </p>

          <p className="mt-5 text-sm text-gray-400">
            © 2026 NammaJodi. All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}