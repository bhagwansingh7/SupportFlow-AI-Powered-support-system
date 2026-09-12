import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Home from './components/Home'

import './App.css'
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/'    element={<Home/>} />
        <Route  path='/navbar'    element={<NavBar/>} />
        <Route  path='/login'    element={<Login/>} />
        <Route  path='/register'    element={<Register/>} />
        <Route  path='/profile'    element={<Profile/>} />
        


      </Routes>
    </BrowserRouter>


  )
}

export default App
