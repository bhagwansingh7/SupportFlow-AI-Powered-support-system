const express=require('express');
const ticketRouter=express.Router();
const { getallTickets } = require('../controllers/ticket.controller');



ticketRouter.get('/getAllTickets',getallTickets)

module.exports=ticketRouter