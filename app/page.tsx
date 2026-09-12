"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [lookingFor, setLookingFor] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");

    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    setIsLoggedIn(false);

    alert("Logged out successfully! 👋");
    router.push("/login");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (lookingFor) {
      params.set("lookingFor", lookingFor);
    }

    if (age) {
      params.set("age", age);
    }

    if (location) {
      params.set("location", location);
    }

    router.push(`/matches?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <span className="text-3xl">💕</span>

            <span className="text-2xl font-bold tracking-tight text-pink-600">
              NammaJodi
            </span>
          </button>

          {/* NAVIGATION */}
          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">

            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-pink-600"
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => router.push("/matches")}
              className="text-gray-600 transition hover:text-pink-600"
            >
              Matches
            </button>

            <button
              type="button"
              onClick={() => window.location.href = "/about"}
              className="text-gray-600 transition hover:text-pink-600"
            >
              About
            </button>

            <button
              type="button"
              onClick={() => window.location.href = "/contact"}
              className="text-gray-600 transition hover:text-pink-600"
            >
              Contact
            </button>

          </div>

          {/* LOGIN / PROFILE */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() => router.push("/profile-details?own=true")}
                className="rounded-full border border-pink-600 px-4 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
              >
                Profile
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-pink-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700"
              >
                Logout
              </button>

            </div>
          ) : (
            <button
              type="button"
              onClick={() => window.location.href = "/login"}
              className="rounded-full bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700"
            >
              Login
            </button>
          )}

        </div>
      </nav>


      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-white to-purple-100 px-6 py-24 md:py-32">

        {/* Decorative circles */}
        <div className="absolute -left-20 top-10 h-48 w-48 rounded-full bg-pink-200/40 blur-3xl" />

        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl text-center">

          <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-pink-200 bg-white px-5 py-2 text-sm font-semibold text-pink-600 shadow-sm">
            ✨ Discover Meaningful Connections
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">

            Find Someone Who
            <span className="block text-pink-600">
              Truly Matches You
            </span>

          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            NammaJodi helps you discover compatible profiles,
            explore meaningful connections, and begin your journey
            with confidence.
          </p>

          {/* HERO BUTTONS */}
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="rounded-full bg-pink-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-700"
            >
              Create Your Profile
            </button>

            <button
              type="button"
              onClick={() => router.push("/matches")}
              className="rounded-full border border-pink-600 bg-white px-8 py-3.5 font-semibold text-pink-600 transition hover:bg-pink-50"
            >
              Explore Matches
            </button>

          </div>

          {/* TRUST INFO */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">

            <span>✓ Easy Profile Creation</span>
            <span>✓ Smart Search</span>
            <span>✓ Secure Profiles</span>

          </div>

        </div>
      </section>


      {/* ================= SEARCH ================= */}
      <section className="relative px-6 py-16">

        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-xl shadow-pink-100/50 md:p-8">

            <div className="mb-7 text-center">

              <p className="text-sm font-bold uppercase tracking-widest text-pink-600">
                Search Profiles
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Find Your Jodi
              </h2>

              <p className="mt-2 text-gray-500">
                Search using your preferred criteria
              </p>

            </div>

            <div className="grid gap-4 md:grid-cols-4">

              {/* LOOKING FOR */}
              <select
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-700 outline-none transition focus:border-pink-500 focus:bg-white"
              >
                <option value="">Looking for</option>
                <option value="Bride">Bride</option>
                <option value="Groom">Groom</option>
              </select>

              {/* AGE */}
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-700 outline-none transition focus:border-pink-500 focus:bg-white"
              >
                <option value="">Age</option>
                <option value="21-25">21 - 25</option>
                <option value="26-30">26 - 30</option>
                <option value="31-35">31 - 35</option>
              </select>

              {/* LOCATION */}
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-700 outline-none transition focus:border-pink-500 focus:bg-white"
              >
                <option value="">Location</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Bangalore">Bangalore</option>
              </select>

              {/* SEARCH BUTTON */}
              <button
                type="button"
                onClick={handleSearch}
                className="rounded-xl bg-pink-600 px-5 py-3.5 font-semibold text-white shadow-md transition hover:bg-pink-700"
              >
                🔎 Search
              </button>

            </div>

          </div>

        </div>
      </section>


      {/* ================= WHY NAMMAJODI ================= */}
      <section className="bg-gray-50 px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-pink-600">
              Why Choose Us
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
              Why NammaJodi?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Everything you need to discover profiles and manage
              your journey in one simple platform.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* CARD 1 */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl transition group-hover:bg-pink-600">
                🔎
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Smart Search
              </h3>

              <p className="mt-3 leading-6 text-gray-600">
                Easily find profiles using age, location,
                preferences, and other details.
              </p>

            </div>


            {/* CARD 2 */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl transition group-hover:bg-purple-200">
                🔐
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Profile Management
              </h3>

              <p className="mt-3 leading-6 text-gray-600">
                Create, update, view, and manage your profile
                easily in one place.
              </p>

            </div>


            {/* CARD 3 */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl transition group-hover:bg-pink-600">
                💕
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Meaningful Connections
              </h3>

              <p className="mt-3 leading-6 text-gray-600">
                Explore profiles based on your preferences
                and discover meaningful connections.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-pink-600">
              Simple Process
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
              How NammaJodi Works
            </h2>

          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-600 text-xl font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Create Profile
              </h3>

              <p className="mt-2 text-gray-600">
                Add your basic details and create your profile.
              </p>

            </div>

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-600 text-xl font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Explore Matches
              </h3>

              <p className="mt-2 text-gray-600">
                Search and explore profiles using your preferences.
              </p>

            </div>

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-600 text-xl font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Manage Your Profile
              </h3>

              <p className="mt-2 text-gray-600">
                View, update, save, and manage your profile easily.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-14 text-center text-white shadow-xl">

          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Get Started?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-pink-50">
            Create your NammaJodi profile and explore the platform today.
          </p>

          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="mt-7 rounded-full bg-white px-8 py-3.5 font-semibold text-pink-600 shadow-md transition hover:bg-pink-50"
          >
            Create Profile
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-950 px-6 py-12 text-white">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 md:grid-cols-3">

            {/* BRAND */}
            <div>

              <h3 className="text-2xl font-bold text-pink-500">
                💕 NammaJodi
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                A simple platform to create profiles,
                explore matches, and discover meaningful connections.
              </p>

            </div>

            {/* QUICK LINKS */}
            <div>

              <h4 className="font-semibold">
                Quick Links
              </h4>

              <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="text-left hover:text-pink-400"
                >
                  Home
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/matches")}
                  className="text-left hover:text-pink-400"
                >
                  Matches
                </button>

                <button
                  type="button"
                  onClick={() => window.location.href = "/about"}
                  className="text-left hover:text-pink-400"
                >
                  About
                </button>

                <button
                  type="button"
                  onClick={() => window.location.href = "/contact"}
                  className="text-left hover:text-pink-400"
                >
                  Contact
                </button>

              </div>

            </div>

            {/* CONTACT */}
            <div>

              <h4 className="font-semibold">
                Contact
              </h4>

              <div className="mt-4 space-y-3 text-sm text-gray-400">

                <p>📧 support@nammajodi.com</p>

                <p>📞 +91 98765 43210</p>

                <p>📍 Tamil Nadu, India</p>

              </div>

            </div>

          </div>

          <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            © 2026 NammaJodi. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}