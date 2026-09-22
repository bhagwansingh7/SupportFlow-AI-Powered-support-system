const express=require('express');
const app=express()
const env=require('dotenv').config();
const cors=require('cors');
const db=require("./src/config/db")
const userRoutes=require('./src/routes/user.route')
const ticketRoutes=require('./src/routes/tickets.route')
const {isAuth} =require('./src/middlewares/isAuth.middleware')
const adminRoutes=require('./src/routes/admin.route')
const agentRoutes=require('./src/routes/agent.routes')
const CookieParser=require('cookie-parser')

const PORT= process.env.PORT || 4000;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(CookieParser())

app.use('/api/user',userRoutes)

app.use('/api/tickets',ticketRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/agent',agentRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    isAuth
});

