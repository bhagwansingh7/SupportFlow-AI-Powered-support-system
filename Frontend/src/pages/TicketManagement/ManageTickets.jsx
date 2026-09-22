import React, { useState } from "react";
import { useAdminData } from "../../context/AdminContext";
import axios from "axios";
import { URL } from "../../apis/Backend_url";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
const ManageTickets = () => {
  const { tickets, agents } = useAdminData();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketId, setTicketId] = useState("");
  const [agentId, setAgentId] = useState("");
  const navigate=useNavigate()
  // Only unassigned tickets
  ///:id/assign
  const unassignedTickets = tickets.filter(
    (ticket) => ticket.assigned_to === null
  );

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
    setTicketId(ticket.id);
};

  const handleAssign = async () => {
    console.log("Ticket ID:", ticketId);
    console.log("Agent ID:", agentId);

    try {
        const response=await axios.patch(`${URL}/api/admin/${ticketId}/assign`,{
            agentId
        },{
            withCredentials:true
        })
        
        
    } catch (error) {
        console.log("error in assigning tickets",error)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button onClick={()=>navigate('/DashBoard')}><HiArrowLeft/></button>
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Assign Tickets
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Assign unassigned tickets to support agents.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* LEFT SIDE - UNASSIGNED TICKETS */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Available Tickets
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {unassignedTickets.length} unassigned tickets
              </p>
            </div>

            <div className="divide-y">
              {unassignedTickets.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-500">
                  No unassigned tickets available.
                </div>
              ) : (
                unassignedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between px-6 py-5"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {ticket.title}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Ticket ID: #{ticket.id}
                      </p>

                      <div className="mt-2 flex gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                          {ticket.category}
                        </span>

                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-600">
                          {ticket.priority}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectTicket(ticket)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Assign
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT SIDE - AGENTS */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Available Agents
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Use the Agent ID to assign a ticket.
              </p>
            </div>

            <div className="divide-y">
              {agents?.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-500">
                  No agents available.
                </div>
              ) : (
                agents?.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {agent.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {agent.email}
                      </p>
                    </div>

                    <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700">
                      ID: {agent.id}
                    </span>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

        {/* ASSIGN FORM */}
        {selectedTicket && (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-gray-800">
              Assign Ticket
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the ticket ID and agent ID.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Ticket ID */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Ticket ID
                </label>

                <input
                  type="number"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Enter ticket ID"
                />
              </div>

              {/* Agent ID */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Agent ID
                </label>

                <input
                  type="number"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Enter agent ID"
                />
              </div>

            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAssign}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Assign Ticket
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ManageTickets;
