const express=require('express');
const ticketRouter=express.Router();
const {isAuth}=require('../middlewares/isAuth.middleware')

const { getallTickets,
    createticket, 
    deleteTicketById,
    getTicket,
    getunResolvedTickets,
    getallTicketsByid} = require('../controllers/ticket.controller');

const { isAuthorized } = require('../middlewares/isAuthorized.middleware');




ticketRouter.get('/getAllTickets',isAuth,getallTickets)
ticketRouter.post('/createTicket',isAuth,createticket)
ticketRouter.delete('/deleteTicketById/:id',isAuth,deleteTicketById)
ticketRouter.get('/getTicketById/:id',isAuth,getTicket)
ticketRouter.get('/getUnresolvedTickets',isAuth,isAuthorized('admin'),getunResolvedTickets)

ticketRouter.get('/getuserstickets/:id',isAuth,getallTicketsByid)

module.exports=ticketRouter