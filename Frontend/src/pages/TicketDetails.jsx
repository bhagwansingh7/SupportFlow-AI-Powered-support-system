import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { URL } from '../apis/Backend_url';
import { useUser } from '../context/UserContext';
import { HiArrowLeft } from 'react-icons/hi2';

const TicketDetails = () => {
    const {user}=useUser()
    const [ticket,setTicket] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getTicket = async () => {
            try {
                // console.log("Ticket ID:", id);
                // console.log(
                //     "API URL:",
                //     `${URL}/api/tickets/getTicketById/${id}`
                // );

                const response = await axios.get(
                    `${URL}/api/tickets/getTicketById/${id}`,
                    {
                        withCredentials: true
                    }
                );

                // console.log("Ticket response:", response.data[0]);

                setTicket(response.data[0]);

            } catch (error) {
                console.log("Error in fetching the ticket:", error);
            }
        };

        getTicket();
    }, [id]);

    // Wait until API response comes
    if (!ticket) {
        return (
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50">
                <p className="text-gray-600">Loading ticket...</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-8">

            <div className="mx-auto max-w-5xl">

                {/* Back */}
                <button
                    onClick={() => navigate('/user-tickets')}
                    className="mb-6 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                    <HiArrowLeft /> Back to My Tickets
                </button>

                {/* Main Card */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                    {/* Header */}
                    <div className="border-b border-gray-200 px-6 py-6">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Ticket ID: #{ticket.id}
                                </p>

                                <h1 className="mt-1 text-2xl font-bold text-gray-800">
                                    {ticket.title}
                                </h1>

                                <p className="mt-2 text-sm text-gray-500">
                                    Created on {ticket.created_at}
                                </p>

                            </div>

                            {/* Status */}
                            <span className="w-fit rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-semibold capitalize text-yellow-700">
                                {ticket.status}
                            </span>

                        </div>

                    </div>

                    {/* Ticket Information */}
                    <div className="grid grid-cols-1 gap-6 border-b border-gray-200 px-6 py-6 sm:grid-cols-3">

                        {/* Category */}
                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Category
                            </p>

                            <p className="mt-1 text-sm font-medium capitalize text-gray-800">
                                {ticket.category}
                            </p>

                        </div>

                        {/* Priority */}
                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Priority
                            </p>

                            <span className="mt-1 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold capitalize text-red-700">
                                {ticket.priority}
                            </span>

                        </div>

                        {/* Assigned Agent */}
                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Assigned Agent
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-800">
                                {ticket.agent_name || "Not Assigned"}
                            </p>

                        </div>

                    </div>

                    {/* Description */}
                    <div className="border-b border-gray-200 px-6 py-6">

                        <h2 className="text-lg font-semibold text-gray-800">
                            Description
                        </h2>

                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-600">
                            {ticket.description}
                        </p>

                    </div>

                    {/* Ticket Timeline */}
                    <div className="px-6 py-6">

                        <h2 className="text-lg font-semibold text-gray-800">
                            Ticket Activity
                        </h2>

                        <div className="mt-6 space-y-6">

                            {/* Ticket Created */}
                            <div className="flex gap-4">

                                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-indigo-600"></div>

                                <div>

                                    <p className="text-sm font-medium text-gray-800">
                                        Ticket Created
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {ticket.created_at}
                                    </p>

                                </div>

                            </div>

                            {/* Waiting for agent */}
                            <div className="flex gap-4">

                                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-gray-300"></div>

                                <div>

                                    <p className="text-sm font-medium text-gray-800">
                                        {ticket.agent_name
                                            ? `Assigned to ${ticket.agent_name}`
                                            : "Waiting for support agent"
                                        }
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {ticket.agent_name
                                            ? "A support agent has been assigned to this ticket"
                                            : "No agent has been assigned yet"
                                        }
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default TicketDetails;