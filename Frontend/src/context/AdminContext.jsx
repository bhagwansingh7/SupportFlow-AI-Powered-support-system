import { createContext, useContext ,useState,useEffect} from "react";
import axios from "axios";
import { URL } from "../apis/Backend_url";

const AdminContext=createContext();
export const AdminProvider=({children})=>{

    const [users,setUsers]=useState(null)
    const [tickets,setTickets]=useState(null)
    const [agents,setAgents]=useState(null)
//getusers
    const getallUsers=async()=>{
                    try {
            const response=await axios.get(`${URL}/api/admin/getAllUsers`,{
                withCredentials:true
            })
            // console.log("admin users:",response.data)
            setUsers(response.data)
        } catch (error) {
            console.log('error in fetching all users at admin context',error)
        }
    }
//get all tickets

    const getallTickets=async()=>{
        try {
            const response=await axios.get(`${URL}/api/admin/getAllTickets`,{
                withCredentials:true
            })
            console.log("all  Tickets before set:",response.data)
            setTickets(response.data)
            console.log("after set the tickets:",response.data)
        } catch (error) {
            console.log('error in fetching all Tickets at admin context',error)
        }
    }
    const getallAgents=async()=>{
                    try {
            const response=await axios.get(`${URL}/api/admin/getAllAgents`,{
                withCredentials:true
            })
            console.log("all agents from admin:",response.data)
            setAgents(response.data)
        } catch (error) {
            console.log('error in fetching all agents at admin context',error)
        }
    }
   useEffect(()=>{
         getallUsers(),
         getallTickets(),
         getallAgents()
    },[])
return(
        <AdminContext.Provider value={{users,setUsers,tickets,setTickets,agents,setAgents}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminData=()=>{
    const context=useContext(AdminContext)
    return context;
}