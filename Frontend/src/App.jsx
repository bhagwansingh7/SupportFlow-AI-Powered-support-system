import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Home from './pages/Home'

import './App.css'
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";
import AllTickets from "./pages/AllTickets";
import AgentProfile from "./pages/AgentProfile";
import { useUser } from "./context/UserContext";


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
        <Route path="/profile"
        element={
          user?.role === "agent"
            ? <AgentProfile />
            : <Profile />
          }
        />

        <Route  path='/create-ticket'    element={<CreateTicket/>} />
        <Route  path='/ticket-details/:id'    element={<TicketDetails/>} />
        <Route  path='/all-tickets'    element={<AllTickets/>} />
        


      </Routes>
    </BrowserRouter>


  )
}

export default App
