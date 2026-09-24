import React from "react";
import NavBar from "../components/NavBar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  console.log("user data from home page:", user);

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">

          {/* Welcome */}
          {user && (
            <div className="mx-auto mb-8 flex max-w-3xl items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <p className="text-lg font-medium text-slate-700">
                Welcome back,{" "}
                <span className="font-bold text-indigo-600">
                  {user.name}
                </span>{" "}
                👋
              </p>
            </div>
          )}

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
              Smart Customer Support Platform
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Customer support,
              <span className="block text-indigo-600">
                simplified.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Manage customer tickets, automate repetitive tasks, and
              empower your support team with one powerful platform.
            </p>

            {/* Role Based Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

              {/* USER */}
              {user?.role === "user" && (
                <button
                  onClick={() => navigate("/create-ticket")}
                  className="w-full rounded-lg bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 sm:w-auto"
                >
                  Create Ticket →
                </button>
              )}

              {/* AGENT */}
              {user?.role === "agent" && (
                <button
                  onClick={() => navigate("/Dashboard")}
                  className="w-full rounded-lg bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 sm:w-auto"
                >
                  Agent Dashboard →
                </button>
              )}

              {/* ADMIN */}
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/Dashboard")}
                  className="w-full rounded-lg bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 sm:w-auto"
                >
                  Admin Dashboard →
                </button>
              )}

              {/* COMMON */}
              <a
                href="#features"
                className="w-full rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 sm:w-auto"
              >
                Explore Features
              </a>

            </div>
          </div>


          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-slate-900">24/7</p>
              <p className="mt-1 text-sm text-slate-500">
                Support Management
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-slate-900">AI</p>
              <p className="mt-1 text-sm text-slate-500">
                Powered Assistance
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-slate-900">Fast</p>
              <p className="mt-1 text-sm text-slate-500">
                Ticket Resolution
              </p>
            </div>

          </div>


          {/* Features */}
          <div
            id="features"
            className="mx-auto mt-24 max-w-6xl"
          >

            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Everything you need
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Built for modern support teams
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Everything you need to organize, automate and improve
                your customer support workflow.
              </p>
            </div>


            <div className="grid gap-6 md:grid-cols-3">

              {/* Ticket */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition group-hover:bg-indigo-600">
                  🎫
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  Smart Tickets
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Create, organize, assign and track customer support
                  tickets from one centralized workspace.
                </p>

              </div>


              {/* Automation */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                  ⚡
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  Automated Workflow
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Automate repetitive tasks and route customer issues
                  to the right team without unnecessary manual work.
                </p>

              </div>


              {/* AI */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                  🤖
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  AI Powered
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Classify tickets, summarize conversations and help
                  support agents respond to customers faster.
                </p>

              </div>

            </div>
          </div>


          {/* Bottom CTA */}
          <div className="mx-auto mt-24 max-w-5xl rounded-3xl bg-indigo-600 px-8 py-12 text-center shadow-xl shadow-indigo-200">

            <h2 className="text-3xl font-bold text-white">
              Ready to improve your support workflow?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-indigo-100">
              Bring your tickets, team and customer conversations
              together in one simple platform.
            </p>

            {/* Role Based Bottom Button */}

            {user?.role === "user" && (
              <button
                onClick={() => navigate("/create-ticket")}
                className="mt-7 rounded-lg bg-white px-7 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Create a Ticket →
              </button>
            )}

            {user?.role === "agent" && (
              <button
                onClick={() => navigate("/Dashboard")}
                className="mt-7 rounded-lg bg-white px-7 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Manage Assigned Tickets →
              </button>
            )}

            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/Dashboard")}
                className="mt-7 rounded-lg bg-white px-7 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Manage Support System →
              </button>
            )}

          </div>

        </div>
      </section>
    </main>
  );
};

export default Home;
