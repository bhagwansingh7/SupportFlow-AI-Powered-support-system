import React from "react";
import { useUser } from "../context/UserContext";
import { useTickets } from "../context/TicketContext";
import { useAdminData } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const {users,setUsers}=useAdminData();
  const {tickets,useTickets}=useAdminData();
  const {agents,setAgents}=useAdminData()
  const navigate=useNavigate()
  
  const pendigTickets=tickets.filter(ticket=>ticket.status='in_progress').length
  const opentickets=tickets.filter(ticket=>ticket.status='open').length
   const ResolvedTickets=tickets.filter(ticket=>ticket.status='resolved').length
  
  






  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              SupportFlow / Admin
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-800">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage users, agents, tickets and support operations.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              A
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Admin
              </p>
              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Users</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              {users.length}
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              Registered users
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Agents</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              {agents.length}
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              Active support agents
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Tickets</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              {tickets.length}
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              All support tickets
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending Tickets</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-500">
              {pendigTickets}
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              Waiting for resolution
            </p>
          </div>

        </div>

        {/* Admin Actions */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-800">
              Admin Controls
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage the SupportFlow platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <button className="rounded-xl border border-slate-200 p-5 text-left transition hover:border-blue-300 hover:bg-blue-50">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                👥
              </div>

              <h3 className="font-semibold text-slate-800">
                Manage Users
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                View, manage and remove users.
              </p>
            </button>

            <button className="rounded-xl border border-slate-200 p-5 text-left transition hover:border-purple-300 hover:bg-purple-50">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                🧑‍💼
              </div>

              <h3 className="font-semibold text-slate-800">
                Manage Agents
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                View and manage support agents.
              </p>
            </button>

            <button
            onClick={()=>navigate('/manage-tickets')}
            className="rounded-xl border border-slate-200 p-5 text-left transition hover:border-green-300 hover:bg-green-50">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                🎫
              </div>

              <h3 className="font-semibold text-slate-800">
                All Tickets
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                View and manage all support tickets.
              </p>
            </button>

            <button className="rounded-xl border border-slate-200 p-5 text-left transition hover:border-orange-300 hover:bg-orange-50">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                🔗
              </div>

              <h3 className="font-semibold text-slate-800">
                Assign Tickets
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Assign tickets to support agents.
              </p>
            </button>

          </div>
        </div>

        {/* Management Sections */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* User Management */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  User Management
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage registered users.
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {users.length} users
              </span>
            </div>

            <div className="mt-5 space-y-3">

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">
                    View All Users
                  </p>
                  <p className="text-xs text-slate-500">
                    See complete user list
                  </p>
                </div>

                <button className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                  View
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">
                    Delete User
                  </p>
                  <p className="text-xs text-slate-500">
                    Remove an existing account
                  </p>
                </div>

                <button className="rounded-lg bg-red-100 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-200">
                  Manage
                </button>
              </div>

            </div>
          </div>

          {/* Ticket Management */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Ticket Management
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor and manage support tickets.
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {tickets.length} Tickets
              </span>
            </div>

            <div className="mt-5 space-y-3">

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">
                    View All Tickets
                  </p>
                  <p className="text-xs text-slate-500">
                    Monitor every support request
                  </p>
                </div>

                <button className="rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700">
                  View
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="font-medium text-slate-800">
                    Assign Tickets
                  </p>
                  <p className="text-xs text-slate-500">
                    Assign tickets to available agents
                  </p>
                </div>

                <button className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600">
                  Assign
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Ticket Status */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Ticket Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current ticket distribution across SupportFlow.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
              <p className="text-sm font-medium text-yellow-700">
                Open
              </p>
              <p className="mt-2 text-2xl font-bold text-yellow-800">
                {opentickets}
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-700">
                In Progress
              </p>
              <p className="mt-2 text-2xl font-bold text-blue-800">
                {pendigTickets}
              </p>
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <p className="text-sm font-medium text-green-700">
                Resolved
              </p>
              <p className="mt-2 text-2xl font-bold text-green-800">
                {ResolvedTickets}
              </p>
            </div>

          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-slate-800">
            System Status
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  API Server
                </p>
                <p className="text-xs text-slate-500">
                  Operational
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Database
                </p>
                <p className="text-xs text-slate-500">
                  Operational
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Authentication
                </p>
                <p className="text-xs text-slate-500">
                  Operational
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;