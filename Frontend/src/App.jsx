import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Home from './pages/Home'

import './App.css'
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";
import UserTickets from "./pages/UserTickets";
import AgentProfile from "./pages/AgentProfile";
import { useUser } from "./context/UserContext";
import AdminProfile from "./pages/AdminProfile";
import { AdminProvider } from "./context/AdminContext";
import AllTickets from "./pages/TicketManagement/AllTickets";
import ManageTickets from "./pages/TicketManagement/ManageTickets";
import ManageUser from "./pages/UserManagement/ManageUser";
import AssignTickets from "./pages/AgentsWorking/AssignTickets";
import { AgentTicketProvider } from "./context/AgentTicketContext";

function App() {
  const {user}=useUser()

  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/'    element={<Home/>} />
        <Route  path='/navbar'    element={<NavBar/>} />
        <Route  path='/login'    element={<Login/>} />
        <Route  path='/register'    element={<Register/>} />
        {/* <Route  path='/profile'    element={<Profile/>} /> */}
        <Route path='/users-alltickets' element={<UserTickets />}/>
        <Route
          path="/profile"
          element={
            user?.role === "admin"
              ?
              
                <AdminProfile />
              
              : user?.role === "agent"
                ? <AgentProfile />
                : <Profile />
          }
        />
        <Route path='/DashBoard' element={ user?.role==="admin" ? 
       
          <AdminProfile/>
        
        :user?.role==="agent" ? 
        <AgentProfile/>:<Profile/>} />

        
          {/*user routes*/}
        <Route  path='/create-ticket'  element={<CreateTicket/>}/>
        <Route  path='/ticket-details/:id'  element={<TicketDetails/>}/>
        <Route  path='/user-tickets'  element={<UserTickets/>}/>
        
       {/*admin routes */}
        
        <Route  path='/manage-tickets'   element={<ManageTickets/>} />
        <Route  path='/all-tickets'    element={<AllTickets/>} />
        <Route path='/manage-users' element={<ManageUser/>}/>
      {/*agent routes */}
      <Route  path="/manage-assign-tickets" element={
      <AgentTicketProvider>
        <AssignTickets />
      </AgentTicketProvider>
        
        }  />


      </Routes>
    </BrowserRouter>


  )
}

export default App
