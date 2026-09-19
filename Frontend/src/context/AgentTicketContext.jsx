import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../apis/Backend_url";
import { useUser } from "./UserContext";

const AgentTicketContext = createContext();

export const AgentTicketProvider = ({ children }) => {

    const [tickets, setTickets] = useState([]);
    const {user}=useUser()
    const id = user?.id;

    useEffect(() => {
        if(!id) return;
        const getAllUsersTickets = async () => {
            try {
                console.log("User id for call the function",user?.id)
                const response = await axios.get(
                    `${URL}/api/agent/getAssignTickets`,
                    {
                        withCredentials: true
                    }
                );

                console.log("all tickets details", response.data);

                setTickets(response.data.tickets);

            } catch (error) {
                console.log("error in fetching tickets", error);
            }
        };

        getAllUsersTickets();

    }, [id]);

    return (
        <AgentTicketContext.Provider value={{ tickets, setTickets }}>
            {children}
        </AgentTicketContext.Provider>
    );
};

export const useAgentTickets = () => {
    const context = useContext(AgentTicketContext);
    return context;
};