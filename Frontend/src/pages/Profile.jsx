
import React from "react";
import { useUser } from "../context/UserContext";
import NavBar from "../components/NavBar"

const Profile = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <NavBar />
      <div className="mx-auto max-w-4xl">

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Cover */}
          <div className="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 sm:h-52">
          </div>

          {/* Profile Header */}
          <div className="px-5 pb-6 sm:px-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              {/* Avatar + Basic Info */}
              <div className="-mt-16 flex flex-col items-center sm:items-start">
                
                {/* Avatar */}
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-indigo-100 text-4xl font-bold text-indigo-700 shadow-md">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="mt-4 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-slate-900">
                    {user?.name || "User"}
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    {user?.email || "No email available"}
                  </p>

                  <span className="mt-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
                    {user?.role || "User"}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-3 sm:justify-end">
                <button
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Edit Profile
                </button>

                <button
                  className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Settings
                </button>
              </div>

            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 border-y border-slate-200 py-5 text-center">

              <div>
                <p className="text-xl font-bold text-slate-900">12</p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Tickets
                </p>
              </div>

              <div className="border-x border-slate-200">
                <p className="text-xl font-bold text-slate-900">8</p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Resolved
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-slate-900">4</p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Pending
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* About */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              About
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Welcome to your SupportFlow profile. Manage your account,
              track your support requests, and keep your information
              up to date from here.
            </p>
          </div>

          {/* Account Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Account Information
            </h2>

            <div className="mt-4 space-y-4">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Full Name
                </p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {user?.name || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Email
                </p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Role
                </p>
                <p className="mt-1 text-sm font-medium capitalize text-slate-800">
                  {user?.role || "User"}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;

