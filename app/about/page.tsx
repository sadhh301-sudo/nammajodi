"use client";

import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50 text-gray-800">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-white/95 px-5 py-4 shadow-sm backdrop-blur md:px-10">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <button
            onClick={() => router.push("/")}
            className="text-xl font-bold text-pink-600 md:text-2xl"
          >
            💍 NammaJodi
          </button>

          <div className="hidden items-center gap-7 text-sm font-medium md:flex">

            <button
              onClick={() => router.push("/")}
              className="text-gray-700 hover:text-pink-600"
            >
              Home
            </button>

            <button
              onClick={() => router.push("/matches")}
              className="text-gray-700 hover:text-pink-600"
            >
              Matches
            </button>

            <button className="font-semibold text-pink-600">
              About
            </button>

            <button
              onClick={() => (window.location.href = "/contact")}
              className="text-gray-700 hover:text-pink-600"
            >
              Contact
            </button>

          </div>

          <button
            onClick={() => router.push("/")}
            className="rounded-full border border-pink-600 px-4 py-2 text-sm font-semibold text-pink-600 hover:bg-pink-50"
          >
            Home
          </button>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-white to-purple-100 px-5 py-20 md:px-10 md:py-28">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-200/40 blur-3xl"></div>

        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl"></div>

        <div className="relative mx-auto max-w-4xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
            About NammaJodi
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Connecting People,
            <span className="block text-pink-600">
              Creating Meaningful Connections
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            NammaJodi is a simple and modern platform designed
            to help users create profiles, discover suitable
            matches, and manage their information easily.
          </p>

        </div>

      </section>

      {/* Introduction */}
      <section className="px-5 py-16 md:px-10 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
                Who We Are
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                A Simple Way to Discover Profiles
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                NammaJodi brings profile creation, searching,
                filtering, and profile management together in
                one simple platform.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                Users can create their profile, explore available
                profiles, use search filters, and view detailed
                profile information through an easy-to-use interface.
              </p>

              <button
                onClick={() => router.push("/matches")}
                className="mt-7 rounded-full bg-pink-600 px-7 py-3 font-semibold text-white transition hover:bg-pink-700"
              >
                Explore Matches →
              </button>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
                  👤
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Create Profile
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Add your basic information and create your
                  personal profile.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
                  🔎
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Find Profiles
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Search and filter profiles using different
                  preferences.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
                  ✏️
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Manage Profile
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Update your profile details whenever you need.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
                  🔐
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Simple Experience
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Enjoy a clean and straightforward user experience.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Why NammaJodi */}
      <section className="bg-white px-5 py-16 md:px-10 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
              Why NammaJodi
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Built for a Simple Experience
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              Everything is designed to make profile discovery
              and management simple and convenient.
            </p>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-gray-100 bg-slate-50 p-7 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
                ⚡
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Easy to Use
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Simple navigation and clear sections make
                the platform easy to understand.
              </p>

            </div>

            <div className="rounded-3xl border border-gray-100 bg-slate-50 p-7 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
                🔎
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Smart Search
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Find profiles quickly using name, age,
                location, and preferences.
              </p>

            </div>

            <div className="rounded-3xl border border-gray-100 bg-slate-50 p-7 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
                📱
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Mobile Friendly
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                The platform is designed to work smoothly
                across different screen sizes.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="px-5 py-16 md:px-10 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Get Started in Three Simple Steps
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              Getting started with NammaJodi is simple and
              straightforward.
            </p>

          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">

            {/* Step 1 */}
            <div className="relative rounded-3xl bg-white p-8 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-600 text-xl font-bold text-white">
                01
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Create Your Profile
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Add your basic details and create your
                NammaJodi profile.
              </p>

            </div>

            {/* Step 2 */}
            <div className="relative rounded-3xl bg-white p-8 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white">
                02
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Explore Profiles
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Use search and filters to explore profiles
                based on your preferences.
              </p>

            </div>

            {/* Step 3 */}
            <div className="relative rounded-3xl bg-white p-8 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-600 text-xl font-bold text-white">
                03
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                View Details
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Open a profile to view more information
                in one convenient place.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Mission Section */}
      <section className="bg-white px-5 py-16 md:px-10 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-8 md:p-12">

            <div className="grid items-center gap-10 md:grid-cols-2">

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
                  Our Purpose
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                  Making Profile Discovery Simple
                </h2>

                <p className="mt-5 leading-7 text-gray-600">
                  NammaJodi focuses on providing a clean,
                  organized, and easy-to-use platform where
                  users can manage their profiles and discover
                  other profiles with ease.
                </p>

                <p className="mt-4 leading-7 text-gray-600">
                  From creating a profile to searching and
                  viewing profile details, every step is designed
                  to be simple and convenient.
                </p>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-3xl">✨</div>

                  <h3 className="mt-4 font-bold">
                    Clean Design
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Simple layouts with easy navigation.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-3xl">🔍</div>

                  <h3 className="mt-4 font-bold">
                    Easy Search
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Quickly find profiles using filters.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-3xl">📱</div>

                  <h3 className="mt-4 font-bold">
                    Responsive
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Works across mobile and desktop screens.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="text-3xl">⚙️</div>

                  <h3 className="mt-4 font-bold">
                    Easy Management
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Manage profile information easily.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="px-5 py-16 md:px-10 md:py-20">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 to-purple-600 px-7 py-12 text-center text-white md:px-12">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-100">
            Start Exploring
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Explore NammaJodi Today
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-pink-100">
            Create your profile and explore the available
            profiles through our simple platform.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <button
              onClick={() => router.push("/matches")}
              className="rounded-full bg-white px-8 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
            >
              Explore Matches →
            </button>

            <button
              onClick={() => (window.location.href = "/contact")}
              className="rounded-full border border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </button>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-950 px-5 py-12 text-white md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-3">

            {/* Brand */}
            <div>

              <h3 className="text-2xl font-bold text-pink-500">
                💍 NammaJodi
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                A simple and modern platform to discover
                meaningful connections.
              </p>

            </div>

            {/* Quick Links */}
            <div>

              <h4 className="font-semibold">
                Quick Links
              </h4>

              <div className="mt-4 space-y-3 text-sm text-gray-400">

                <button
                  onClick={() => router.push("/")}
                  className="block hover:text-white"
                >
                  Home
                </button>

                <button
                  onClick={() => router.push("/matches")}
                  className="block hover:text-white"
                >
                  Matches
                </button>

                <button
                  className="block text-pink-400"
                >
                  About
                </button>

                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="block hover:text-white"
                >
                  Contact
                </button>

              </div>

            </div>

            {/* Contact */}
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

          <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            © 2026 NammaJodi. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}
                