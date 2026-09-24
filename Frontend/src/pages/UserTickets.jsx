import React, { useState } from "react";
import axios from "axios";
import { URL } from "../apis/Backend_url";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../context/TicketContext";
import { useUser } from "../context/UserContext";
import { HiArrowLeft } from "react-icons/hi2";

const UserTickets = () => {
  const { tickets } = useTickets();
  const { user } = useUser();

  const navigate = useNavigate();

  
  const [activeHistory, setActiveHistory] = useState(null);

  
  const [activeMessage, setActiveMessage] = useState(null);

  
  const [activities, setActivities] = useState({});

  
  const [message, setMessage] = useState("");

  
  const [historyLoading, setHistoryLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);


  const [error, setError] = useState("");


  const handleHistory = async (ticketId) => {
    setError("");
    if (activeHistory === ticketId) {
      setActiveHistory(null);
      return;
    }

    setActiveHistory(ticketId);
    if (activities[ticketId]) {
      return;
    }

    try {
      setHistoryLoading(true);

      const response = await axios.get(
        `${URL}/api/user/tickets/${ticketId}/activity`,
        {
          withCredentials: true,
        }
      );

      setActivities((prev) => ({
        ...prev,
        [ticketId]: response.data.response || [],
      }));
    } catch (error) {
      console.error(error);
      setError("Unable to load ticket history.");
    } finally {
      setHistoryLoading(false);
    }
  };

  // =========================
  // MESSAGE BOX
  // =========================
  const handleMessage = (ticketId) => {
    setError("");

    if (activeMessage === ticketId) {
      setActiveMessage(null);
      return;
    }

    setActiveMessage(ticketId);

    // Close history when message opens
    setActiveHistory(null);
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = async (ticketId) => {
    if (!message.trim()) {
      return;
    }

    try {
      setMessageLoading(true);
      setError("");

      await axios.post(
        `${URL}/api/user/tickets/${ticketId}/message`,
        {
          message: message.trim(),
        },
        {
          withCredentials: true,
        }
      );

      setMessage("");

      // Close message box after sending
      setActiveMessage(null);

      alert("Message sent successfully");
    } catch (error) {
      console.error(error);
      setError("Unable to send message.");
    } finally {
      setMessageLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">

      {/* Back */}
      <button
        onClick={() => navigate("/profile")}
        className="mb-6 flex items-center gap-2 text-slate-600 transition hover:text-indigo-600"
      >
        <HiArrowLeft size={20} />
        <span className="text-sm font-medium">Back to Profile</span>
      </button>

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

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Tickets */}
        <div className="space-y-4">

          {tickets.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm">
              <p className="text-sm text-slate-500">
                You haven't created any tickets yet.
              </p>
            </div>
          ) : (
            tickets.map((ticket) => (

              <div
                key={ticket.id}
                className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >

                {/* =========================
                    TICKET INFORMATION
                ========================== */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="text-xs font-medium text-slate-400">
                        #{ticket.id}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          ticket.status === "resolved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
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


                {/* =========================
                    BOTTOM INFORMATION
                ========================== */}

                <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4">

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


                  {/* =========================
                      ACTION BUTTONS
                  ========================== */}

                  <div className="flex flex-wrap gap-3">

                    {/* Details */}
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/ticket-details/${ticket.id}`)
                      }
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      View Details
                    </button>


                    {/* History */}
                    <button
                      type="button"
                      onClick={() => handleHistory(ticket.id)}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      {activeHistory === ticket.id
                        ? "Hide History"
                        : "View History"}
                    </button>


                    {/* Message */}
                    <button
                      type="button"
                      onClick={() => handleMessage(ticket.id)}
                      className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                    >
                      {activeMessage === ticket.id
                        ? "Hide Message"
                        : "Message"}
                    </button>

                  </div>


                  {/* =========================
                      HISTORY
                  ========================== */}

                  {activeHistory === ticket.id && (
                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-5">

                      <h3 className="mb-4 text-sm font-bold text-slate-800">
                        Ticket History
                      </h3>

                      {historyLoading ? (
                        <p className="text-sm text-slate-500">
                          Loading history...
                        </p>
                      ) : activities[ticket.id]?.length === 0 ? (
                        <p className="text-sm text-slate-500">
                          No activity found for this ticket.
                        </p>
                      ) : (
                        <div className="space-y-4">

                          {activities[ticket.id]?.map((activity) => (

                            <div
                              key={activity.id}
                              className="rounded-lg bg-white p-4 shadow-sm"
                            >

                              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <span className="text-sm font-semibold text-slate-800">
                                  By {(user.id===activity.user_id)?'user':'agent'}#{activity.user_id}
                                </span>
                                <span className="text-sm font-semibold text-slate-800">
                                  {activity.action}
                                </span>

                                <span className="text-xs text-slate-400">
                                  {activity.created_at}
                                </span>

                              </div>

                              {activity.old_value && (
                                <p className="mt-2 text-sm text-slate-500">
                                  Old value:
                                  <span className="ml-1 font-medium text-slate-700">
                                    {activity.old_value}
                                  </span>
                                </p>
                              )}

                              {activity.new_value && (
                                <p className="mt-1 text-sm text-slate-500">
                                  New value:
                                  <span className="ml-1 font-medium text-slate-700">
                                    {activity.new_value}
                                  </span>
                                </p>
                              )}

                            </div>

                          ))}

                        </div>
                      )}

                    </div>
                  )}




                  {activeMessage === ticket.id && (
                    <div className="mt-2 rounded-xl border border-indigo-100 bg-indigo-50 p-5">

                      <h3 className="mb-3 text-sm font-bold text-slate-800">
                        Send Message
                      </h3>

                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message..."
                        rows={4}
                        className="w-full resize-none rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />

                      <div className="mt-3 flex justify-end">

                        <button
                          type="button"
                          disabled={messageLoading || !message.trim()}
                          onClick={() => sendMessage(ticket.id)}
                          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {messageLoading ? "Sending..." : "Send Message"}
                        </button>

                      </div>

                    </div>
                  )}

                </div>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  );
};

export default UserTickets;
