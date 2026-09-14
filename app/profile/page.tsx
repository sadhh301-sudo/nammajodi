"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ProfilePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isEdit = searchParams.get("edit") === "true";

  // BACKEND URL
  const API_URL = "http://localhost:5000";

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");

  // =========================
  // LOAD EXISTING PROFILE
  // =========================
  useEffect(() => {
    const savedProfile = localStorage.getItem("nammajodiProfile");
    const savedEmail = localStorage.getItem("userEmail");

    if (savedEmail) {
      setEmail(savedEmail);
    }

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        setName(profile.name || "");
        setAge(profile.age ? String(profile.age) : "");
        setLookingFor(profile.lookingFor || "");
        setLocation(profile.location || "");
        setProfession(profile.profession || "");
        setAbout(profile.about || "");
        setEmail(profile.email || savedEmail || "");
      } catch (error) {
        console.error("Profile loading error:", error);
      }
    }
  }, []);

  // =========================
  // CREATE / UPDATE PROFILE
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // REMOVE EXTRA SPACES
    const cleanName = name.trim();
    const cleanProfession = profession.trim();
    const cleanAbout = about.trim();
    const cleanEmail = email.trim();

    // =========================
    // NAME VALIDATION
    // =========================
    const nameRegex = /^[A-Za-z ]+$/;

    if (!cleanName) {
      alert("Please enter your name ❌");
      return;
    }

    if (!nameRegex.test(cleanName)) {
      alert("Name should contain only letters ❌");
      return;
    }

    // =========================
    // AGE VALIDATION
    // =========================
    const numericAge = Number(age);

    if (!age) {
      alert("Please enter your age ❌");
      return;
    }

    if (numericAge < 18 || numericAge > 60) {
      alert("Age must be between 18 and 60 ❌");
      return;
    }

    // =========================
    // LOOKING FOR VALIDATION
    // =========================
    if (!lookingFor) {
      alert("Please select Looking For ❌");
      return;
    }

    // =========================
    // LOCATION VALIDATION
    // =========================
    if (!location) {
      alert("Please select your location ❌");
      return;
    }

    // =========================
    // PROFESSION VALIDATION
    // =========================
    if (
      cleanProfession &&
      !nameRegex.test(cleanProfession)
    ) {
      alert("Profession should contain only letters ❌");
      return;
    }

    // =========================
    // EMAIL VALIDATION
    // =========================
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail) {
      alert("Please enter your email ❌");
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      alert("Please enter a valid email address ❌");
      return;
    }

    // =========================
    // PROFILE DATA
    // =========================
    const profileData = {
      name: cleanName,
      age: numericAge,
      lookingFor,
      location,
      profession: cleanProfession,
      about: cleanAbout,
      email: cleanEmail,
    };

    try {
      // ==================================================
      // EDIT → UPDATE EXISTING PROFILE
      // ==================================================
      if (isEdit) {
        const savedProfile =
          localStorage.getItem("nammajodiProfile");

        if (!savedProfile) {
          alert("Profile not found ❌");
          return;
        }

        const oldProfile = JSON.parse(savedProfile);

        if (!oldProfile._id) {
          alert("Profile ID not found ❌");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/profiles/${oldProfile._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(
            data.message ||
              "Profile update failed ❌"
          );
          return;
        }

        // SAVE UPDATED PROFILE
        localStorage.setItem(
          "nammajodiProfile",
          JSON.stringify(data.profile)
        );

        alert("Profile updated successfully! 🎉");

        router.push("/matches");
        return;
      }

      // ==================================================
      // CREATE → NEW PROFILE
      // ==================================================
      const response = await fetch(
        `${API_URL}/api/profiles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Profile creation failed ❌"
        );
        return;
      }

      // SAVE NEW PROFILE
      localStorage.setItem(
        "nammajodiProfile",
        JSON.stringify(data.profile)
      );

      alert("Profile created successfully! 🎉");

      router.push("/matches");
    } catch (error) {
      console.error("Backend connection error:", error);

      alert("Backend connection failed ❌");
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8f0] px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

        {/* HEADING */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#8b4513]">
            {isEdit
              ? "Edit Your Profile"
              : "Create Your Profile"}
          </h1>

          <p className="mt-2 text-gray-500">
            {isEdit
              ? "Update your profile details"
              : "Add your details to find suitable matches"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name *
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#8b4513]"
            />
          </div>

          {/* AGE */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Age *
            </label>

            <input
              type="number"
              min="18"
              max="60"
              placeholder="Enter your age"
              value={age}
              onChange={(e) =>
                setAge(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#8b4513]"
            />
          </div>

          {/* LOOKING FOR */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Looking For *
            </label>

            <select
              value={lookingFor}
              onChange={(e) =>
                setLookingFor(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#8b4513]"
            >
              <option value="">Select</option>
              <option value="Bride">Bride</option>
              <option value="Groom">Groom</option>
            </select>
          </div>

          {/* LOCATION */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Location *
            </label>

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#8b4513]"
            >
              <option value="">Select Location</option>

              <option value="Chennai">
                Chennai
              </option>

              <option value="Coimbatore">
                Coimbatore
              </option>

              <option value="Bangalore">
                Bangalore
              </option>

              <option value="Thirupur">
                Thirupur
              </option>

              <option value="Pondicherry">
                Pondicherry
              </option>

              <option value="Karaikal">
                Karaikal
              </option>
            </select>
          </div>

          {/* PROFESSION */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Profession
            </label>

            <input
              type="text"
              placeholder="Enter your profession"
              value={profession}
              onChange={(e) =>
                setProfession(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#8b4513]"
            />
          </div>

          {/* ABOUT */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              About
            </label>

            <textarea
              placeholder="Tell us about yourself"
              value={about}
              onChange={(e) =>
                setAbout(e.target.value)
              }
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#8b4513]"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email *
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#8b4513]"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#8b4513] py-3 font-semibold text-white transition hover:bg-[#6f350f]"
          >
            {isEdit
              ? "Update Profile"
              : "Create Profile"}
          </button>

          {/* BACK */}
          <button
            type="button"
            onClick={() => router.push("/matches")}
            className="w-full py-2 font-medium text-[#8b4513]"
          >
            ← Back to Matches
          </button>

        </form>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fff8f0]">
          <p className="font-medium text-gray-600">
            Loading profile...
          </p>
        </div>
      }
    >
      <ProfilePageContent />
    </Suspense>
  );
}