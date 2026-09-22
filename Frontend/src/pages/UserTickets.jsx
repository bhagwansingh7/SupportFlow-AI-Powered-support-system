
import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../apis/Backend_url";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../context/TicketContext";
const UserTickets = () => {

const {tickets}=useTickets();

    const navigate=useNavigate()


  


  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            My Tickets
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and track all the support tickets you have created.
          </p>
        </div>

        {/* Tickets */}
        <div className="space-y-4">

          {tickets.map((ticket) => (

            <div
              key={ticket.id}
              className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >

              {/* Top Section */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                {/* Ticket Information */}
                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="text-xs font-medium text-slate-400">
                      #{ticket.id}
                    </span>

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold capitalize text-yellow-700">
                      {ticket.status}
                    </span>

                  </div>

                  <h2 className="mt-3 text-lg font-semibold text-slate-900">
                    {ticket.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {ticket.description}
                  </p>

                </div>

                {/* Priority */}
                <div className="shrink-0">

                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold capitalize text-red-700">
                    {ticket.priority}
                  </span>

                </div>

              </div>

              {/* Bottom Section */}
              <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex flex-wrap gap-5 text-xs text-slate-500">

                  <span>
                    Category:
                    <span className="ml-1 font-medium capitalize text-slate-700">
                      {ticket.category}
                    </span>
                  </span>

                  <span>
                    Created:
                    <span className="ml-1 font-medium text-slate-700">
                      {ticket.created_at}
                    </span>
                  </span>

                </div>

                <button
                  type="button"
                  onClick={()=>navigate(`/ticket-details/${ticket.id}`)}
                  className="w-fit rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default UserTickets;

