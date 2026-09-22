import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../apis/Backend_url";
import { useUser } from "./UserContext";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {

    const [tickets, setTickets] = useState([]);
    const {user}=useUser()
    const id = user?.id;

    useEffect(() => {
        console.log("user id from the Ticket context",id)
        if(!id) return;
        const getAllUsersTickets = async () => {
            try {
                console.log("User id for call the function",user?.id)
                const response = await axios.get(
                    `${URL}/api/tickets/getuserstickets/${id}`,
                    {
                        withCredentials: true
                    }
                );

                console.log("all  User's tickets", response.data);

                setTickets(response.data.response);

            } catch (error) {
                console.log("error in fetching tickets", error);
            }
        };

        getAllUsersTickets();

    }, [id]);

    return (
        <TicketContext.Provider value={{ tickets, setTickets }}>
            {children}
        </TicketContext.Provider>
    );
};

export const useTickets = () => {
    const context = useContext(TicketContext);
    return context;
};