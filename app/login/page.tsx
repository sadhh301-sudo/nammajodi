"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Login state save
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    alert("Login successful! 🎉");
    router.push("/matches");
  };

  return (
    <main className="min-h-screen bg-[#fff8f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#8b4513]">
            💕 NammaJodi
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8b4513]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#8b4513]"
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full bg-[#8b4513] text-white py-3 rounded-lg font-semibold hover:bg-[#6f350f] transition"
          >
            Login
          </button>

        </form>

        {/* Create Account */}
        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="text-[#8b4513] font-semibold hover:underline"
          >
            Create Account
          </button>
        </p>

        {/* Back to Home */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full mt-4 text-[#8b4513] font-medium"
        >
          ← Back to Home
        </button>

      </div>
    </main>
  );
}