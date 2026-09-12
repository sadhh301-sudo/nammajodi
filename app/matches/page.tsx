"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type DbProfile = {
  _id: string;
  name: string;
  age: number;
  lookingFor: string;
  location: string;
  profession?: string;
  about?: string;
  email: string;
};

function MatchesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [profiles, setProfiles] = useState<DbProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<DbProfile[]>([]);
  const [savedProfiles, setSavedProfiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [lookingForFilter, setLookingForFilter] = useState("");

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

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

  /* ---------------- LOGIN CHECK ---------------- */

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");

    if (loginStatus !== "true") {
      router.push("/login");
      return;
    }

    const storedProfile = localStorage.getItem("nammajodiProfile");

    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        setCurrentUserId(profile._id || null);
      } catch {
        setCurrentUserId(null);
      }
    }

    const saved = localStorage.getItem("savedProfiles");

    if (saved) {
      try {
        setSavedProfiles(JSON.parse(saved));
      } catch {
        setSavedProfiles([]);
      }
    }
  }, [router]);

  /* ---------------- GET PROFILES ---------------- */

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          "/api/profiles"
        );

        const data = await response.json();

        if (response.ok) {
          setProfiles(data.profiles || []);
          setFilteredProfiles(data.profiles || []);
        }
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  /* ---------------- HOME SEARCH VALUES ---------------- */

  useEffect(() => {
    setSearch(searchParams.get("name") || "");
    setAgeFilter(searchParams.get("age") || "");
    setLocationFilter(searchParams.get("location") || "");
    setLookingForFilter(searchParams.get("lookingFor") || "");
  }, [searchParams]);

  /* ---------------- FILTER ---------------- */

  useEffect(() => {
    let result = [...profiles];

    if (search.trim()) {
      result = result.filter((profile) =>
        profile.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (ageFilter) {
      const [minAge, maxAge] = ageFilter.split("-").map(Number);

      result = result.filter(
        (profile) =>
          profile.age >= minAge &&
          profile.age <= maxAge
      );
    }

    if (locationFilter) {
      result = result.filter(
        (profile) =>
          profile.location.toLowerCase() ===
          locationFilter.toLowerCase()
      );
    }

    if (lookingForFilter) {
      result = result.filter(
        (profile) =>
          profile.lookingFor.toLowerCase() ===
          lookingForFilter.toLowerCase()
      );
    }

    setFilteredProfiles(result);
  }, [
    profiles,
    search,
    ageFilter,
    locationFilter,
    lookingForFilter,
  ]);

  /* ---------------- SAVE PROFILE ---------------- */

  const handleSave = (id: string) => {
    let updatedSavedProfiles: string[];

    if (savedProfiles.includes(id)) {
      updatedSavedProfiles = savedProfiles.filter(
        (profileId) => profileId !== id
      );
    } else {
      updatedSavedProfiles = [...savedProfiles, id];
    }

    setSavedProfiles(updatedSavedProfiles);

    localStorage.setItem(
      "savedProfiles",
      JSON.stringify(updatedSavedProfiles)
    );
  };

  /* ---------------- DELETE OWN PROFILE ---------------- */

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/profiles/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Profile deleted successfully! ✅");

        localStorage.removeItem("nammajodiProfile");

        setProfiles((prev) =>
          prev.filter((profile) => profile._id !== id)
        );

        router.push("/profile");
      } else {
        alert(data.message || "Failed to delete profile");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  /* ---------------- VIEW PROFILE ---------------- */

  const handleViewProfile = (id: string) => {
    router.push(`/profile-details?id=${id}&mongo=true`);
  };

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    alert("Logged out successfully! 👋");

    router.push("/login");
  };

  /* ---------------- CLEAR FILTERS ---------------- */

  const clearFilters = () => {
    setSearch("");
    setAgeFilter("");
    setLocationFilter("");
    setLookingForFilter("");

    router.push("/matches");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-gray-800">

      {/* ================= NAVBAR ================= */}

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
              className="font-medium text-gray-600 transition hover:text-pink-600"
            >
              Home
            </button>

            <button
              className="font-semibold text-pink-600"
            >
              Matches
            </button>

            <button
              onClick={() =>
                (window.location.href = "/about")
              }
              className="font-medium text-gray-600 transition hover:text-pink-600"
            >
              About
            </button>

            <button
              onClick={() =>
                (window.location.href = "/contact")
              }
              className="font-medium text-gray-600 transition hover:text-pink-600"
            >
              Contact
            </button>

          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                router.push("/profile-details?own=true")
              }
              className="rounded-full border border-pink-600 px-4 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="hidden rounded-full bg-pink-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-pink-700 sm:block"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      {/* ================= HEADER ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-white to-purple-100 px-5 py-16 md:px-10 md:py-20">

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
              Discover Connections
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Find Profiles That
              <span className="text-pink-600">
                {" "}Match Your Preferences
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
              Explore profiles based on age, location and
              preferences. Find the right connections with
              NammaJodi.
            </p>

          </div>

          <div className="mt-8 flex flex-wrap gap-4">

            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
              <p className="text-2xl font-bold text-pink-600">
                {profiles.length}
              </p>
              <p className="text-sm text-gray-500">
                Profiles
              </p>
            </div>

            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
              <p className="text-2xl font-bold text-purple-600">
                {savedProfiles.length}
              </p>
              <p className="text-sm text-gray-500">
                Saved
              </p>
            </div>

            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">
                {filteredProfiles.length}
              </p>
              <p className="text-sm text-gray-500">
                Showing
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FILTER SECTION ================= */}

      <section className="px-5 py-8 md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">

            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Find Your Match
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Use filters to discover suitable profiles.
                </p>
              </div>

              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-pink-600 hover:text-pink-700"
              >
                Clear Filters
              </button>

            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

              {/* Search */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Search Name
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔎
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search by name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-100"
                  />

                </div>
              </div>

              {/* Age */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Age
                </label>

                <select
                  value={ageFilter}
                  onChange={(e) =>
                    setAgeFilter(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-100"
                >
                  <option value="">All Ages</option>
                  <option value="21-25">21 - 25</option>
                  <option value="26-30">26 - 30</option>
                  <option value="31-35">31 - 35</option>
                  <option value="36-40">36 - 40</option>
                  <option value="41-60">41 - 60</option>
                </select>
              </div>

              {/* Location */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Location
                </label>

                <select
                  value={locationFilter}
                  onChange={(e) =>
                    setLocationFilter(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-100"
                >
                  <option value="">All Locations</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>

              {/* Looking For */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Looking For
                </label>

                <select
                  value={lookingForFilter}
                  onChange={(e) =>
                    setLookingForFilter(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-100"
                >
                  <option value="">Everyone</option>
                  <option value="Bride">Bride</option>
                  <option value="Groom">Groom</option>
                </select>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= RESULTS ================= */}

      <section className="px-5 pb-16 md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="text-sm font-semibold text-pink-600">
                MATCH RESULTS
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
                Recommended Profiles
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              {filteredProfiles.length} profiles found
            </p>

          </div>

          {/* Loading */}

          {loading && (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600"></div>

              <p className="font-medium text-gray-600">
                Loading profiles...
              </p>

            </div>
          )}

          {/* No Results */}

          {!loading && filteredProfiles.length === 0 && (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

              <div className="text-5xl">
                🔍
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No profiles found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                Try changing your filters or search
                criteria to discover more profiles.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 rounded-full bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
              >
                Clear Filters
              </button>

            </div>
          )}

          {/* Profile Cards */}

          {!loading && filteredProfiles.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredProfiles.map((profile) => {

                const isOwnProfile =
                  profile._id === currentUserId;

                const isSaved =
                  savedProfiles.includes(profile._id);

                return (
                  <article
                    key={profile._id}
                    className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* Image */}

                    <div className="relative h-72 overflow-hidden bg-gray-100">

                      <img
                        src={
                          imageMap[profile.name] ||
                          "/Public/Ananya.jpg"
                        }
                        alt={profile.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>

                      <div className="absolute bottom-4 left-4 text-white">

                        <h3 className="text-2xl font-bold">
                          {profile.name}
                        </h3>

                        <p className="mt-1 text-sm text-white/90">
                          {profile.age} years • {profile.location}
                        </p>

                      </div>

                      {/* Save */}

                      {!isOwnProfile && (
                        <button
                          onClick={() =>
                            handleSave(profile._id)
                          }
                          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow-md backdrop-blur transition hover:scale-105"
                          title={
                            isSaved
                              ? "Remove from saved"
                              : "Save profile"
                          }
                        >
                          {isSaved ? "❤️" : "♡"}
                        </button>
                      )}

                      {/* Own Profile */}

                      {isOwnProfile && (
                        <span className="absolute left-4 top-4 rounded-full bg-pink-600 px-3 py-1.5 text-xs font-bold text-white">
                          Your Profile
                        </span>
                      )}

                    </div>

                    {/* CARD CONTENT */}

                    <div className="p-5">

                      <div className="flex flex-wrap gap-2">

                        {profile.profession && (
                          <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
                            💼 {profile.profession}
                          </span>
                        )}

                        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                          📍 {profile.location}
                        </span>

                      </div>

                      {profile.about && (
                        <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                          {profile.about}
                        </p>
                      )}

                      {/* BUTTONS */}

                      <div className="mt-5 flex gap-3">

                        <button
                          onClick={() =>
                            handleViewProfile(profile._id)
                          }
                          className="flex-1 rounded-xl bg-pink-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
                        >
                          View Profile
                        </button>

                        {isOwnProfile && (
                          <button
                            onClick={() =>
                              handleDelete(profile._id)
                            }
                            className="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>
                        )}

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-gray-950 px-5 py-10 text-white md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 md:grid-cols-3">

            <div>
              <h3 className="text-2xl font-bold text-pink-500">
                💍 NammaJodi
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
                A simple and modern platform to discover
                meaningful connections.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                Quick Links
              </h4>

              <div className="mt-3 space-y-2 text-sm text-gray-400">

                <button
                  onClick={() => router.push("/")}
                  className="block hover:text-white"
                >
                  Home
                </button>

                <button
                  onClick={() =>
                    (window.location.href = "/about")
                  }
                  className="block hover:text-white"
                >
                  About
                </button>

                <button
                  onClick={() =>
                    (window.location.href = "/contact")
                  }
                  className="block hover:text-white"
                >
                  Contact
                </button>

              </div>
            </div>

            <div>
              <h4 className="font-semibold">
                Contact
              </h4>

              <p className="mt-3 text-sm text-gray-400">
                support@nammajodi.com
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Tamil Nadu, India
              </p>
            </div>

          </div>

          <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            © 2026 NammaJodi. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}

export default function Matches() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="font-medium text-gray-600">
            Loading matches...
          </p>
        </div>
      }
    >
      <MatchesContent />
    </Suspense>
  );
}

                    
                        