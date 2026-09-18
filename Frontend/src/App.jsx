import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Home from './pages/Home'

import './App.css'
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import CreateTicket from "./pages/CreateTicket";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/'    element={<Home/>} />
        <Route  path='/navbar'    element={<NavBar/>} />
        <Route  path='/login'    element={<Login/>} />
        <Route  path='/register'    element={<Register/>} />
        <Route  path='/profile'    element={<Profile/>} />
        <Route  path='/create-ticket'    element={<CreateTicket/>} />
        


      </Routes>
    </BrowserRouter>


  )
}

export default App
