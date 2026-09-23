import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useAgentTickets } from "../../context/AgentTicketContext";
import axios from "axios";
import { URL } from "../../apis/Backend_url";

const AssignTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showActivities, setShowActivities] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showStatusBox, setShowStatusBox] = useState(false);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");

  
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();

  const { tickets, setTickets } = useAgentTickets();


  const handleViewActivity = async (ticketId) => {
    try {
      const response = await axios.get(
        `${URL}/api/agent/${ticketId}/getActivity`,
        {
          withCredentials: true,
        }
      );

      console.log("Activity response:", response.data);

      
      setActivities(response.data.response);
    } catch (error) {
      console.log(
        "Error in fetching ticket activities:",
        error.response?.data || error.message
      );
    }
  };

 
  const filteredTickets =
    filter === "all"
      ? tickets
      : tickets.filter((ticket) => ticket.status === filter);

 
  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);

    
    setActivities([]);

    setShowActivities(false);
    setShowMessageBox(false);
    setShowStatusBox(false);
  };


  const getStatusStyle = (status) => {
    if (status === "resolved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "in_progress") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "closed") {
      return "bg-gray-100 text-gray-700";
    }

    return "bg-blue-100 text-blue-700";
  };


  const getPriorityStyle = (priority) => {
    if (priority === "High" || priority === "high") {
      return "bg-red-100 text-red-700";
    }

    if (priority === "Medium" || priority === "medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  const handleStatus = async (ticketId, newStatus) => {
    try {
      const response = await axios.patch(
        `${URL}/api/agent/${ticketId}/status`,
        {
          status: newStatus,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      // Update ticket list
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId
            ? { ...ticket, status: newStatus }
            : ticket
        )
      );

      // Update selected ticket
      setSelectedTicket((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
            }
          : prev
      );

      setShowStatusBox(false);

      // Refresh activities because status change creates activity
      if (showActivities) {
        handleViewActivity(ticketId);
      }
    } catch (error) {
      console.log(
        "Error updating ticket status:",
        error.response?.data || error.message
      );
    }
  };

 
  // SEND MESSAGE
  
  const handleSentMessage = async (ticketId) => {
    if (!message.trim()) {
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/api/agent/${ticketId}/message`,
        {
          message: message,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      // Clear textarea
      setMessage("");

      // Refresh activities because message creates activity
      if (showActivities) {
        handleViewActivity(ticketId);
      }
    } catch (error) {
      console.log(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/DashBoard")}
        className="mb-4 text-2xl text-gray-700 hover:text-gray-900"
      >
        <HiArrowLeft />
      </button>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Assigned Tickets
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage tickets assigned to you
        </p>
      </div>

      {/* FILTERS */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "all"
              ? "bg-gray-900 text-white"
              : "border bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("open")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "open"
              ? "bg-blue-600 text-white"
              : "border bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          Open
        </button>

        <button
          onClick={() => setFilter("in_progress")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "in_progress"
              ? "bg-yellow-500 text-white"
              : "border bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          In Progress
        </button>

        <button
          onClick={() => setFilter("resolved")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "resolved"
              ? "bg-green-600 text-white"
              : "border bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          Resolved
        </button>

        <button
          onClick={() => setFilter("closed")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === "closed"
              ? "bg-gray-700 text-white"
              : "border bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          Closed
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ========================= */}
        {/* TICKET LIST */}
        {/* ========================= */}

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Tickets</h2>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              {filteredTickets.length}
            </span>
          </div>

          <div className="space-y-3">
            {filteredTickets.length === 0 ? (
              <div className="py-10 text-center text-sm text-gray-500">
                No tickets found
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => handleSelectTicket(ticket)}
                  className={`w-full rounded-lg border p-4 text-left transition hover:border-gray-400 hover:shadow-sm ${
                    selectedTicket?.id === ticket.id
                      ? "border-blue-500 bg-blue-50"
                      : "bg-white"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-800">
                      #{ticket.id} {ticket.title}
                    </h3>

                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <p className="mb-3 line-clamp-2 text-sm text-gray-500">
                    {ticket.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityStyle(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>

                    <span className="text-xs text-gray-400">
                      {ticket.updated_at}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ========================= */}
        {/* TICKET DETAILS */}
        {/* ========================= */}

        <div className="lg:col-span-2">
          {!selectedTicket ? (
            <div className="flex min-h-[500px] items-center justify-center rounded-xl border bg-white shadow-sm">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  🎫
                </div>

                <h2 className="font-semibold text-gray-700">
                  Select a ticket
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Select a ticket from the list to view its details
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border bg-white shadow-sm">
              {/* DETAILS HEADER */}
              <div className="border-b p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="mb-1 text-sm text-gray-400">
                      Ticket #{selectedTicket.id}
                    </p>

                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedTicket.title}
                    </h2>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(
                      selectedTicket.status
                    )}`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-1 gap-5 border-b p-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Category
                  </p>

                  <p className="mt-1 font-medium text-gray-700">
                    {selectedTicket.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Priority
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${getPriorityStyle(
                      selectedTicket.priority
                    )}`}
                  >
                    {selectedTicket.priority}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Created By
                  </p>

                  <p className="mt-1 font-medium text-gray-700">
                    {selectedTicket.created_by}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Created At
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {selectedTicket.created_at}
                  </p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="border-b p-6">
                <h3 className="mb-2 font-semibold text-gray-800">
                  Description
                </h3>

                <p className="leading-6 text-gray-600">
                  {selectedTicket.description}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-3 border-b p-6">
                <button
                  onClick={() => {
                    const nextState = !showActivities;

                    setShowActivities(nextState);

                    if (nextState) {
                      handleViewActivity(selectedTicket.id);
                    }
                  }}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  {showActivities ? "Hide Activities" : "View Activities"}
                </button>

                <button
                  onClick={() => setShowMessageBox(!showMessageBox)}
                  className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  Add Message
                </button>

                <button
                  onClick={() => setShowStatusBox(!showStatusBox)}
                  className="rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50"
                >
                  Change Status
                </button>
              </div>

              {/* ========================= */}
              {/* CHANGE STATUS */}
              {/* ========================= */}

              {showStatusBox && (
                <div className="border-b bg-gray-50 p-6">
                  <h3 className="mb-3 font-semibold text-gray-800">
                    Change Ticket Status
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {[
                      "open",
                      "in_progress",
                      "resolved",
                      "closed",
                    ].map((status) => (
                      <button
                        key={status}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize hover:bg-gray-100 ${
                          selectedTicket.status === status
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "bg-white text-gray-700"
                        }`}
                        onClick={() =>
                          handleStatus(selectedTicket.id, status)
                        }
                      >
                        {status.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================= */}
              {/* MESSAGE BOX */}
              {/* ========================= */}

              {showMessageBox && (
                <div className="border-b bg-gray-50 p-6">
                  <h3 className="mb-3 font-semibold text-gray-800">
                    Send Message
                  </h3>

                  <textarea
                    rows="4"
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                  <div className="mt-3 flex justify-end">
                    <button
                      className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!message.trim()}
                      onClick={() =>
                        handleSentMessage(selectedTicket.id)
                      }
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              )}

              {/* ========================= */}
              {/* ACTIVITIES */}
              {/* ========================= */}

              {showActivities && (
                <div className="p-6">
                  <h3 className="mb-5 text-lg font-semibold text-gray-800">
                    Ticket Activity
                  </h3>

                  {activities.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No activity found for this ticket.
                    </p>
                  ) : (
                    <div className="relative ml-3 border-l border-gray-200">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="relative mb-6 ml-6"
                        >
                          {/* DOT */}
                          <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-600" />

                          <div className="rounded-lg border bg-gray-50 p-4">
                            {/* ACTION + TIME */}
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                              <p className="font-medium capitalize text-gray-800">
                                {activity.action.replace("_", " ")}
                              </p>

                              <span className="text-xs text-gray-400">
                                {activity.created_at}
                              </span>
                            </div>

                            {/* USER */}
                            <p className="mt-1 text-sm text-gray-500">
                              By User #{activity.user_id}
                            </p>

                            {/* OLD VALUE */}
                            {activity.old_value && (
                              <p className="mt-2 text-sm text-gray-600">
                                <span className="font-medium">
                                  Old:
                                </span>{" "}
                                {activity.old_value}
                              </p>
                            )}

                            {/* NEW VALUE */}
                            {activity.new_value && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">
                                  New:
                                </span>{" "}
                                {activity.new_value}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignTickets;