import React from "react";
import { useUser } from "../context/UserContext";
import { useAgentTickets } from "../context/AgentTicketContext";

const AgentProfile = () => {
    const {user}=useUser();
    const {tickets}=useAgentTickets()
    const OpenTicketsCount=tickets.filter(ticket=>ticket.status==='open').length
    const ResolvedTicketsCount=tickets.filter(ticket=>ticket.status==='resolved').length
    const InProgressTicketsCount=tickets.filter(ticket=>ticket.status==='in_progress').length
    // enum('open','in_progress','resolved','closed')
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">

      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Agent Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your profile and track your assigned support tickets.
          </p>
        </div>

        {/* Profile + Stats */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Agent Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
                A
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Agent
                </h2>

                <p className="text-sm text-slate-500">
                  {user.gmail}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  Support Agent
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-slate-100" />

            {/* Details */}
            <div className="space-y-4">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Name
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Email
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Role
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  {user.role}
                </p>
              </div>

            </div>
          </div>

          {/* Ticket Statistics */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Total */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Assigned
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    {tickets.length}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5h6"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Open */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Open Tickets
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    {OpenTicketsCount}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    In Progress
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    {InProgressTicketsCount}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 12h16M12 4v16"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Resolved */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Resolved Tickets
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    {ResolvedTicketsCount}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Assigned Tickets */}
        <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">

          <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Assigned Tickets
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tickets currently assigned to you.
              </p>
            </div>

            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
              View All
            </button>
          </div>

          {/* Ticket */}
          <div className="divide-y divide-slate-100">

            <div className="p-6 transition hover:bg-slate-50">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-800">
                      Unable to login
                    </h3>

                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">
                      Open
                    </span>

                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                      High
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    I am unable to login to my account even with the correct
                    password.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                    <span>Ticket #2</span>
                    <span>Category: Account</span>
                    <span>Created: 18 Sep 2026</span>
                  </div>
                </div>

                <button className="shrink-0 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                  View Details
                </button>

              </div>
            </div>

            {/* Empty state */}
            <div className="hidden px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <svg
                  className="h-7 w-7 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <h3 className="mt-4 font-semibold text-slate-700">
                No tickets assigned
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Assigned tickets will appear here.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AgentProfile;