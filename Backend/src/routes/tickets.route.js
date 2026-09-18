const express=require('express');
const ticketRouter=express.Router();
const {isAuth}=require('../middlewares/isAuth.middleware')

const { getallTickets,
    createticket, 
    deleteTicketById,
    getTicket} = require('../controllers/ticket.controller');




ticketRouter.get('/getAllTickets',getallTickets)
ticketRouter.post('/createTicket',isAuth,createticket)
ticketRouter.delete('/deleteTicketById/:id',isAuth,deleteTicketById)
ticketRouter.get('/getTicketById/:id',isAuth,getTicket)


module.exports=ticketRouter