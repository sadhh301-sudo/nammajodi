"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

function ProfileDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const own = searchParams.get("own");
  const mongo = searchParams.get("mongo");

  const API_URL = "http://localhost:5000";

  const [savedProfile, setSavedProfile] = useState<any>(null);
  const [mongoProfile, setMongoProfile] =
    useState<DbProfile | null>(null);

  const [currentUserId, setCurrentUserId] = useState("");

  const [loading, setLoading] = useState(
    mongo === "true"
  );

  // ==================================================
  // IMAGE MAP
  // ==================================================

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

  // ==================================================
  // GET OWN PROFILE + CURRENT USER ID
  // ==================================================

  useEffect(() => {
    const storedProfile =
      localStorage.getItem("nammajodiProfile");

    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);

        setSavedProfile(profile);
        setCurrentUserId(profile._id || "");
      } catch (error) {
        console.error(
          "Failed to read saved profile:",
          error
        );
      }
    }
  }, []);

  // ==================================================
  // GET MONGODB PROFILE
  // ==================================================

  useEffect(() => {
    if (mongo !== "true" || !id) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/profiles/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch profile"
          );
        }

        setMongoProfile(data.profile);
      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error
        );

        setMongoProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [mongo, id]);

  // ==================================================
  // LOGOUT
  // ==================================================

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    router.push("/login");
  };

  // ==================================================
  // NAVBAR
  // ==================================================

  const Navbar = () => (
    <nav className="sticky top-0 z-50 border-b bg-white/95 px-5 py-4 shadow-sm backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="text-xl font-bold text-pink-600 md:text-2xl"
        >
          💍 NammaJodi
        </button>

        {/* Desktop Menu */}
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
            onClick={() => router.push("/about")}
            className="font-medium text-gray-700 hover:text-pink-600"
          >
            About
          </button>

          <button
            onClick={() => router.push("/contact")}
            className="font-medium text-gray-700 hover:text-pink-600"
          >
            Contact
          </button>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
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
        <main className="min-h-screen bg-slate-50">

          <Navbar />

          <section className="flex min-h-[70vh] items-center justify-center px-5">

            <div className="text-center">

              <div className="text-5xl">
                👤
              </div>

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

          </section>

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
                  {savedProfile.about || "No description added yet."}
                </p>

              </div>

            </div>

            {/* Buttons */}
            <div className="border-t bg-gray-50 p-7 md:p-10">

              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  onClick={() => router.push("/profile?edit=true")}
                  className="flex-1 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
                >
                  ✏️ Edit Profile
                </button>

                <button
                  onClick={() => router.push("/matches")}
                  className="flex-1 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-pink-100"
                >
                  ← Back to Matches
                </button>

              </div>

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

              <div className="text-5xl">
                🔍
              </div>

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

    const profileImage =
      imageMap[mongoProfile.name];

    // Check whether this is the current user's profile
    const isMyProfile =
      currentUserId !== "" &&
      currentUserId === mongoProfile._id;

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

        {/* Profile Card */}
        <section className="px-5 py-10 md:px-10">

          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-sm">

            {/* Profile Header */}
            <div className="grid gap-8 p-7 md:grid-cols-[320px_1fr] md:p-10">

              {/* Image */}
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

              {/* Basic Info */}
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
                  Looking For
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {mongoProfile.lookingFor}
                </p>

              </div>

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
                    "Profession not specified"}
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
                    "No description added yet."}
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

            {/* Buttons */}
            <div className="border-t bg-gray-50 p-7 md:p-10">

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* EDIT BUTTON - ONLY FOR OWN PROFILE */}
                {isMyProfile && (
                  <button
                    onClick={() =>
                      router.push("/profile?edit=true")
                    }
                    className="flex-1 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
                  >
                    ✏️ Edit Profile
                  </button>
                )}

                {/* BACK BUTTON */}
                <button
                  onClick={() => router.push("/matches")}
                  className="flex-1 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-pink-100"
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
                  onClick={() => router.push("/contact")}
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

                    <p>
                      📧 support@nammajodi.com
                    </p>

                    <p>
                      📞 +91 98765 43210
                    </p>

                    <p>
                      📍 Tamil Nadu, India
                    </p>

                  </div>

                </div>

                </div>

                <div className="mx-auto mt-8 max-w-6xl border-t pt-6 text-center text-sm text-gray-400">
                  ©️ 2026 NammaJodi. All rights reserved.
                </div>

                </footer>

                </main>
    );
  }
  
   // ==================================================
   // NO PROFILE TYPE
    // ==================================================

    return (
      <main className="min-h-screen bg-state-50">

        <Navbar />

        <section className="flex min-h-[70vh] items-center justify-center px-5">

          <div className="text-center">

            <div className='text-5xl'>
              🔍
            </div>

            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              profile not found
            </h1>

            <p className="mt-2 text-gray-500">
              please select a profile from Matches.
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

 // ==================================================
 //PAGE EXPORT
 // ==================================================
 
 export default function ProfileDetails() {
  return (
    <Suspense
        fallback= {
           <div className="flex min-h-screen items-center justify-center bg=state-50">

            <p className="font-medium text-gray-600">
              Loading profile...
            </p>

            </div>
        }
  >
  <ProfileDetailsContent />
  </Suspense>
  );
 }