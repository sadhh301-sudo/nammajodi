"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const API_URL = "https://nammajodi.onrender.com";

function MatchesContent() {
  const router = useRouter();

  const [profiles, setProfiles] = useState<DbProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<DbProfile[]>([]);
  const [savedProfiles, setSavedProfiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [lookingForFilter, setLookingForFilter] = useState("");

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  /* =========================
     PROFILE IMAGES
  ========================= */

  const imageMap: Record<string, string> = {
  Ananya: "/Public/Ananya.jpg",
  Priya: "/Public/Priya.jpg",
  Rahul: "/Public/Rahul.jpg",
  Divya: "/Public/Divya.jpg",
  Karthik: "/Public/Karthik.jpg",
  Arun: "/Public/Arun.jpg",
  Vikram: "/Public/Vikram.jpg",
  Banu: "/Public/Banu.jpg",
  Arjun: "/Public/Arjun.jpg",
  Meera: "/Public/Meera.jpg",
  Sahana: "/Public/Sahana.jpg",
  Keerthika: "/Public/Keerthika.jpg",
  Rajesh: "/Public/Rajesh.jpg",
  Manoj: "/Public/Manoj.jpg",
  Shalini: "/Public/Shalini.jpg",
  Sara: "/Public/Sara.jpg",
};

  /* =========================
     LOGIN + SAVED PROFILES
  ========================= */

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/");
      return;
    }

    const profileData = localStorage.getItem("nammajodiProfile");

    if (profileData) {
      try {
        const profile = JSON.parse(profileData);

        if (profile?._id) {
          setCurrentUserId(profile._id);
        }
      } catch (error) {
        console.error("Profile data error:", error);
      }
    }

    const saved = localStorage.getItem("savedProfiles");

    if (saved) {
      try {
        setSavedProfiles(JSON.parse(saved));
      } catch (error) {
        console.error("Saved profiles error:", error);
      }
    }
  }, [router]);

  /* =========================
     FETCH PROFILES FROM MONGODB
  ========================= */

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/profiles`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }

        const data = await response.json();

        console.log("MongoDB Profiles:", data);

        setProfiles(data.profiles || []);
      } catch (error) {
        console.error("Fetch profiles error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  /* =========================
     SEARCH + FILTER
  ========================= */

  useEffect(() => {
    let result = [...profiles];

    if (search.trim()) {
      result = result.filter((profile) =>
        profile.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (ageFilter) {
      result = result.filter(
        (profile) =>
          profile.age === Number(ageFilter)
      );
    }

    if (locationFilter.trim()) {
      result = result.filter((profile) =>
        profile.location
          .toLowerCase()
          .includes(locationFilter.toLowerCase())
      );
    }

    if (lookingForFilter) {
      result = result.filter(
        (profile) =>
          profile.lookingFor === lookingForFilter
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

  /* =========================
     SAVE PROFILE
  ========================= */

  const handleSaveProfile = (id: string) => {
    let updatedProfiles: string[];

    if (savedProfiles.includes(id)) {
      updatedProfiles = savedProfiles.filter(
        (profileId) => profileId !== id
      );
    } else {
      updatedProfiles = [
        ...savedProfiles,
        id,
      ];
    }

    setSavedProfiles(updatedProfiles);

    localStorage.setItem(
      "savedProfiles",
      JSON.stringify(updatedProfiles)
    );
  };

  /* =========================
     DELETE PROFILE
  ========================= */

  const handleDeleteProfile = async (
    id: string
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/profiles/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      setProfiles((previousProfiles) =>
        previousProfiles.filter(
          (profile) =>
            profile._id !== id
        )
      );

      alert(
        "Profile deleted successfully ✅"
      );
    } catch (error) {
      console.error(
        "Delete profile error:",
        error
      );

      alert(
        "Failed to delete profile ❌"
      );
    }
  };

  /* =========================
     VIEW PROFILE
  ========================= */

  const handleViewProfile = (
    id: string
  ) => {
    router.push(
      `/profile-details?id=${id}&mongo=true`
    );
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "isLoggedIn"
    );

    router.push("/");
  };

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    setSearch("");
    setAgeFilter("");
    setLocationFilter("");
    setLookingForFilter("");
  };

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">
        <div className="navbar-logo">
          ❤️ NammaJodi
        </div>

        <div className="navbar-links">
          <button
            onClick={() =>
              router.push("/")
            }
          >
            Home
          </button>

          <button
            onClick={() =>
              router.push("/about")
            }
          >
            About
          </button>

          <button className="active">
            Matches
          </button>

          <button
            onClick={() =>
              router.push("/contact")
            }
          >
            Contact
          </button>

          <button
            onClick={() =>
              router.push("/profile")
            }
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* =========================
          HEADER
      ========================= */}

      <section className="matches-header">
        <h1>
          Find Your Matches ❤️
        </h1>

        <p>
          Explore profiles and find the
          right match for you.
        </p>
      </section>

      {/* =========================
          FILTERS
      ========================= */}

      <section className="filters-section">

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Age"
          value={ageFilter}
          onChange={(e) =>
            setAgeFilter(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Location"
          value={locationFilter}
          onChange={(e) =>
            setLocationFilter(
              e.target.value
            )
          }
        />

        <select
          value={lookingForFilter}
          onChange={(e) =>
            setLookingForFilter(
              e.target.value
            )
          }
        >
          <option value="">
            Looking For
          </option>

          <option value="Bride">
            Bride
          </option>

          <option value="Groom">
            Groom
          </option>
        </select>

        <button
          className="clear-button"
          onClick={clearFilters}
        >
          🔄 Clear Filters
        </button>

      </section>

      {/* =========================
          RESULTS
      ========================= */}

      <main className="matches-container">

        <div className="results-title">
          <h2>
            👥{" "}
            {filteredProfiles.length}{" "}
            Profiles Found
          </h2>

          <span>
            Good Matches Await ❤️
          </span>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="loading-box">
            <p>
              Loading profiles... ⏳
            </p>
          </div>
        )}

        {/* NO RESULTS */}

        {!loading &&
          filteredProfiles.length ===
            0 && (
            <div className="no-results">
              <h3>
                No profiles found
              </h3>

              <p>
                Try changing your search
                or filter options.
              </p>
            </div>
          )}

        {/* =========================
            PROFILE GRID
        ========================= */}

        {!loading &&
          filteredProfiles.length >
            0 && (
            <div className="profiles-grid">

              {filteredProfiles.map(
                (profile) => {

                  const isOwnProfile =
                    profile._id ===
                    currentUserId;

                  const isSaved =
                    savedProfiles.includes(
                      profile._id
                    );

                  return (
                    <article
                      key={profile._id}
                      className="profile-card"
                    >

                      {/* IMAGE */}

                      <div className="profile-image">

                        <img
                          src={
                            imageMap[
                              profile.name
                            ] ||
                            "/Public/Nanya.jpg"
                          }
                          alt={
                            profile.name
                          }
                        />

                        {isSaved && (
                          <span className="saved-badge">
                            ❤️ Saved
                          </span>
                        )}

                      </div>

                      {/* DETAILS */}

                      <div className="profile-details">

                        <div className="name-row">

                          <h3>
                            {profile.name}
                          </h3>

                          <span className="age">
                            Age:{" "}
                            {profile.age}
                          </span>

                        </div>

                        <p>
                          📍{" "}
                          {profile.location}
                        </p>

                        <p>
                          💼{" "}
                          {profile.profession ||
                            "Not specified"}
                        </p>

                        <p>
                          👤 Looking for:{" "}
                          {profile.lookingFor}
                        </p>

                        <p className="about">
                          {profile.about ||
                            "No description available."}
                        </p>

                        {/* BUTTONS */}

                        <div className="action-buttons">

                          <button
                            className="view-button"
                            onClick={() =>
                              handleViewProfile(
                                profile._id
                              )
                            }
                          >
                            View Profile
                          </button>

                          {!isOwnProfile && (
                            <button
                              className="save-button"
                              onClick={() =>
                                handleSaveProfile(
                                  profile._id
                                )
                              }
                            >
                              {isSaved
                                ? "❤️ Saved"
                                : "🤍 Save"}
                            </button>
                          )}

                          {isOwnProfile && (
                            <button
                              className="delete-button"
                              onClick={() =>
                                handleDeleteProfile(
                                  profile._id
                                )
                              }
                            >
                              Delete
                            </button>
                          )}

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>
          )}

      </main>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">

        <div className="footer-content">

          <div>
            <h3>
              ❤️ NammaJodi
            </h3>

            <p>
              Connect with people and
              discover meaningful profiles.
            </p>
          </div>

          <div>
            <h4>
              Quick Links
            </h4>

            <button
              onClick={() =>
                router.push("/")
              }
            >
              Home
            </button>

            <button
              onClick={() =>
                router.push("/about")
              }
            >
              About
            </button>

            <button
              onClick={() =>
                router.push("/matches")
              }
            >
              Matches
            </button>

            <button
              onClick={() =>
                router.push("/contact")
              }
            >
              Contact
            </button>
          </div>

          <div>
            <h4>
              Contact
            </h4>

            <p>
              📧 nammajodi@example.com
            </p>

            <p>
              📍 India
            </p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 NammaJodi. All rights reserved.
        </div>

      </footer>

      {/* =========================
          PAGE CSS
      ========================= */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #ffffff;
          color: #26354a;
          font-family: Arial, sans-serif;
        }

        /* NAVBAR */

        .navbar {
          width: 100%;
          min-height: 70px;
          padding: 0 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-bottom: 1px solid #eeeeee;
        }

        .navbar-logo {
          font-size: 24px;
          font-weight: 700;
          color: #d91b6f;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .navbar-links button {
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 15px;
          color: #334155;
          padding: 10px 5px;
        }

        .navbar-links button:hover,
        .navbar-links .active {
          color: #d91b6f;
        }

        /* HEADER */

        .matches-header {
          text-align: center;
          padding: 40px 20px;
          background: #fff1f7;
        }

        .matches-header h1 {
          margin: 0 0 10px;
          font-size: 36px;
          color: #a91659;
        }

        .matches-header p {
          margin: 0;
          font-size: 17px;
          color: #52627a;
        }

        /* FILTERS */

        .filters-section {
          width: 100%;
          display: grid;
          grid-template-columns:
            1.5fr
            1fr
            1.3fr
            1.2fr
            1fr;
          gap: 14px;
          padding: 22px 5%;
          background: #fff9fc;
        }

        .filters-section input,
        .filters-section select {
          width: 100%;
          height: 48px;
          padding: 0 15px;
          border: 1px solid #dddddd;
          border-radius: 12px;
          outline: none;
          background: white;
          font-size: 14px;
        }

        .filters-section input:focus,
        .filters-section select:focus {
          border-color: #e32b7a;
        }

        .clear-button {
          height: 48px;
          border: none;
          border-radius: 12px;
          background: #df2875;
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .clear-button:hover {
          background: #c51d64;
        }

        /* MAIN */

        .matches-container {
          width: 100%;
          max-width: 1500px;
          margin: auto;
          padding: 25px 4%;
        }

        .results-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .results-title h2 {
          margin: 0;
          font-size: 20px;
        }

        .results-title span {
          color: #df2875;
          font-size: 14px;
        }

        /* ⭐ 4 PROFILES PER ROW ⭐ */

        .profiles-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 24px;
          width: 100%;
        }

        /* CARD */

        .profile-card {
          width: 100%;
          min-width: 0;
          overflow: hidden;
          background: white;
          border: 1px solid #eeeeee;
          border-radius: 20px;
          box-shadow:
            0 4px 15px
            rgba(0, 0, 0, 0.08);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .profile-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 12px 28px
            rgba(0, 0, 0, 0.14);
        }

        /* IMAGE */

        .profile-image {
          position: relative;
          width: 100%;
          height: 230px;
          overflow: hidden;
          background: #f3f3f3;
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .saved-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 7px 12px;
          border-radius: 20px;
          background: white;
          color: #d91b6f;
          font-size: 12px;
          font-weight: 600;
        }

        /* DETAILS */

        .profile-details {
          padding: 18px;
        }

        .name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 12px;
        }

        .name-row h3 {
          margin: 0;
          font-size: 20px;
          color: #172033;
        }

        .age {
        flex-shrink: 0;
          padding: 6px 10px;
          border-radius: 20px;
          background: #ffe4f0;
          color: #d91b6f;
          font-size: 12px;
          font-weight: 600;
        }

        .profile-details > p {
          margin: 8px 0;
          font-size: 13px;
          line-height: 1.4;
          color: #52627a;
        }

        .profile-details .about {
          min-height: 38px;
          margin-top: 12px;
          color: #697586;
        }

        /* BUTTONS */

        .action-buttons {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }

        .action-buttons button {
          flex: 1;
          min-height: 40px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }

        .view-button {
          border: none;
          background: #df2875;
          color: white;
        }

        .view-button:hover {
          background: #c51d64;
        }

        .save-button {
          border: 1px solid #e33b83;
          background: white;
          color: #d91b6f;
        }

        .save-button:hover {
          background: #fff1f7;
        }

        .delete-button {
          border: 1px solid #e33b3b;
          background: white;
          color: #d33a3a;
        }

        /* LOADING */

        .loading-box,
        .no-results {
          text-align: center;
          padding: 60px 20px;
        }

        .no-results h3 {
          margin-bottom: 8px;
        }

        /* FOOTER */

        .footer {
          margin-top: 40px;
          background: #fff1f7;
        }

        .footer-content {
          display: grid;
          grid-template-columns:
            2fr 1fr 1fr;
          gap: 40px;
          padding: 40px 6%;
        }

        .footer h3 {
          margin-top: 0;
          color: #d91b6f;
        }

        .footer h4 {
          margin-top: 0;
        }

        .footer p {
          font-size: 14px;
          line-height: 1.6;
          color: #596579;
        }

        .footer button {
          display: block;
          border: none;
          background: transparent;
          padding: 5px 0;
          cursor: pointer;
          color: #52627a;
        }

        .footer button:hover {
          color: #d91b6f;
        }

        .footer-bottom {
          text-align: center;
          padding: 15px;
          background: #ffe0ed;
          font-size: 13px;
          color: #697586;
        }

        /* TABLET */

        @media (max-width: 1100px) {

          .profiles-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .filters-section {
            grid-template-columns:
              repeat(2, 1fr);
          }

        }

        /* MOBILE */

        @media (max-width: 700px) {

          .navbar {
            flex-direction: column;
            gap: 10px;
            padding: 15px;
          }

          .navbar-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
          }

          .matches-header h1 {
            font-size: 28px;
          }

          .filters-section {
            grid-template-columns: 1fr;
            padding: 15px;
          }

          .profiles-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .profile-image {
            height: 190px;
          }

          .profile-details {
            padding: 12px;
          }

          .name-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .action-buttons {
            flex-direction: column;
          }

          .footer-content {
            grid-template-columns: 1fr;
          }

        }

        /* SMALL MOBILE */

        @media (max-width: 450px) {

          .profiles-grid {
            grid-template-columns: 1fr;
          }

          .profile-image {
            height: 250px;
          }

        }

      `}</style>
    </>
  );
}

/* =========================
   SUSPENSE
========================= */

export default function Matches() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            padding: "50px",
            textAlign: "center",
          }}
        >
          Loading Matches... ⏳
        </div>
      }
    >
      <MatchesContent />
    </Suspense>
  );
}