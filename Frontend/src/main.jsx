import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext'
import { TicketProvider } from './context/TicketContext.jsx'
import { AgentTicketProvider } from './context/AgentTicketContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <TicketProvider>
        <AgentTicketProvider>
            <AdminProvider>
              <App />
              </AdminProvider>
      
      </AgentTicketProvider>
      </TicketProvider>
    </UserProvider>
  </StrictMode>
)
