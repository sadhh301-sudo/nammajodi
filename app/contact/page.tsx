"use client";

import { useState }from "react";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();

  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [message, setMessage]= useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!name.trim() || !email.trim() || !message.trim()) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const response = await fetch("https://nammajodi.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Message sent successfully! ✅");

      setName("");
      setEmail("");
      setMessage("");
    } else {
      alert(data.message || "Failed to send message ❌");
    }
  } catch (error) {
    console.error(error);
    alert("Backend connection failed ❌");
  }
};

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

            <button
              onClick={() => (window.location.href = "/about")}
              className="text-gray-700 hover:text-pink-600"
            >
              About
            </button>

            <button
              className="font-semibold text-pink-600"
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-white to-purple-100 px-5 py-20 md:px-10 md:py-28">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-200/40 blur-3xl"></div>

        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl"></div>

        <div className="relative mx-auto max-w-4xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
            Contact NammaJodi
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            We’re Here to Help
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            Have a question, need assistance, or want to know more
            about NammaJodi? Our support team is here to help.
          </p>

        </div>

      </section>

      {/* Contact Cards */}
      <section className="px-5 py-14 md:px-10 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 md:grid-cols-3">

            {/* Email */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
                📧
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Email Us
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Send us your questions and we’ll get back to you.
              </p>

              <p className="mt-4 font-semibold text-pink-600">
                support@nammajodi.com
              </p>

            </div>

            {/* Phone */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
                📞
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Call Us
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Need quick assistance? Reach out to our support team.
              </p>

              <p className="mt-4 font-semibold text-pink-600">
                +91 98765 43210
              </p>

            </div>

            {/* Location */}
            <div className="group rounded-3xl border border-gray-100 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
                📍
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Our Location
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                We are available to support users across Tamil Nadu.
              </p>

              <p className="mt-4 font-semibold text-pink-600">
                Tamil Nadu, India
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Contact Form Section */}
      <section className="px-5 pb-16 md:px-10 md:pb-20">

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">

          {/* Left Content */}
          <div className="rounded-3xl bg-gray-900 p-8 text-white md:p-10">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-400">
              Get In Touch
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Have Something to Tell Us?
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Whether you have feedback, a question, or need help,
              send us a message. We’re happy to hear from you.
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600">
                  📧
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Email
                  </p>

                  <p className="font-semibold">
                    support@nammajodi.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600">
                  📞
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Phone
                  </p>

                  <p className="font-semibold">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600">
                  📍
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Location
                  </p>

                  <p className="font-semibold">
                    Tamil Nadu, India
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">

            <h2 className="text-2xl font-bold text-gray-900">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Fill in the details below and our team will get back to you.
            </p>

            <form
              className="mt-7 space-y-5"
              onSubmit={handleSubmit}
            >

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Message
                </label>

                <textarea
                value={message}
                onChange={(e) =>setMessage(e.target.value)}
                  placeholder="Write your message..."
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
              >
                Send Message →
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* FAQ Section */}
      <section className="bg-white px-5 py-16 md:px-10 md:py-20">

        <div className="mx-auto max-w-4xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-gray-500">
              Here are some common questions about NammaJodi.
            </p>

          </div>

          <div className="mt-10 space-y-4">

            <div className="rounded-2xl border border-gray-100 bg-slate-50 p-6">
              <h3 className="font-bold text-gray-900">
                How do I create a profile?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Login to NammaJodi and complete the profile form
                with your basic details.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-slate-50 p-6">
              <h3 className="font-bold text-gray-900">
                Can I edit my profile?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. You can open your profile and use the Edit Profile
                option to update your information.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-slate-50 p-6">
              <h3 className="font-bold text-gray-900">
                Can I search for profiles?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Yes. The Matches page allows you to search and filter
                profiles using different options.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="px-5 py-16 md:px-10">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 to-purple-600 px-7 py-12 text-center text-white md:px-12">

          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Explore NammaJodi?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-pink-100">
            Explore profiles, manage your account, and discover
            a simple way to connect.
          </p>

          <button
            onClick={() => router.push("/matches")}
            className="mt-7 rounded-full bg-white px-8 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
          >
            Explore Matches →
          </button>

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
                  onClick={() => (window.location.href = "/about")}
                  className="block hover:text-white"
                >
                  About
                </button>

                <button
                  className="block text-pink-400"
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