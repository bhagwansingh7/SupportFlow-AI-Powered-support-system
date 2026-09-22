import React, { useState } from "react";

const Tickets = () => {
  const [filter, setFilter] = useState("all");

  // Temporary data - later this will come from your API
  const tickets = [
    {
      id: 1,
      title: "Unable to login",
      description: "User is unable to login to the application",
      category: "Account",
      priority: "high",
      status: "open",
      created_by: 2,
      assigned_to: null,
    },
    {
      id: 2,
      title: "Payment issue",
      description: "Payment was deducted but order was not created",
      category: "Payment",
      priority: "medium",
      status: "pending",
      created_by: 5,
      assigned_to: 12,
    },
    {
      id: 3,
      title: "Profile update problem",
      description: "Unable to update profile information",
      category: "Account",
      priority: "low",
      status: "resolved",
      created_by: 7,
      assigned_to: 16,
    },
  ];

  // Filter tickets according to selected tab
  const filteredTickets =
    filter === "all"
      ? tickets
      : tickets.filter((ticket) => ticket.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          All Tickets
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage all support tickets
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">

        <button
          onClick={() => setFilter("all")}
          className={`rounded-lg px-5 py-2.5 text-sm font-medium transition
            ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }
          `}
        >
          All
        </button>

        <button
          onClick={() => setFilter("open")}
          className={`rounded-lg px-5 py-2.5 text-sm font-medium transition
            ${
              filter === "open"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }
          `}
        >
          Open
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`rounded-lg px-5 py-2.5 text-sm font-medium transition
            ${
              filter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }
          `}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("resolved")}
          className={`rounded-lg px-5 py-2.5 text-sm font-medium transition
            ${
              filter === "resolved"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }
          `}
        >
          Resolved
        </button>

      </div>

      {/* Tickets Table */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px] text-left">

            {/* Table Header */}
            <thead className="border-b bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  ID
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Ticket
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Category
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Priority
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Created By
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Assigned To
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Action
                </th>

              </tr>

            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">

              {filteredTickets.length > 0 ? (

                filteredTickets.map((ticket) => (

                  <tr
                    key={ticket.id}
                    className="transition hover:bg-gray-50"
                  >

                    {/* ID */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      #{ticket.id}
                    </td>

                    {/* Ticket */}
                    <td className="px-6 py-4">

                      <p className="font-medium text-gray-800">
                        {ticket.title}
                      </p>

                      <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                        {ticket.description}
                      </p>

                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ticket.category}
                    </td>

                    {/* Priority */}
                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium
                          ${
                            ticket.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : ticket.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                      >
                        {ticket.priority}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium
                          ${
                            ticket.status === "open"
                              ? "bg-blue-100 text-blue-700"
                              : ticket.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                      >
                        {ticket.status}

                      </span>

                    </td>

                    {/* Created By */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      User #{ticket.created_by}
                    </td>

                    {/* Assigned To */}
                    <td className="px-6 py-4 text-sm text-gray-600">

                      {ticket.assigned_to
                        ? `Agent #${ticket.assigned_to}`
                        : "Not Assigned"}

                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">

                      {/* OPEN */}
                      {ticket.status === "open" && (
                        <button
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Assign Ticket
                        </button>
                      )}

                      {/* PENDING */}
                      {ticket.status === "pending" && (
                        <button
                          className="text-sm font-medium text-yellow-600 hover:text-yellow-800 hover:underline"
                        >
                          See Details
                        </button>
                      )}

                      {/* RESOLVED */}
                      {ticket.status === "resolved" && (
                        <button
                          className="text-sm font-medium text-green-600 hover:text-green-800 hover:underline"
                        >
                          See Details
                        </button>
                      )}

                    </td>

                  </tr>

                ))

              ) : (

                /* No tickets */
                <tr>

                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center"
                  >

                    <p className="text-sm text-gray-500">
                      No {filter} tickets found
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Tickets;
