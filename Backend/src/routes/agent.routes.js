const express=require('express');
const { isAuth } = require('../middlewares/isAuth.middleware');
const { isAuthorized } = require('../middlewares/isAuthorized.middleware');
const { getallTickets } = require('../controllers/ticket.controller');
const {getassignTickets, updateTicketStatus, askQuestionToUser, getAllMessages}=require('../controllers/agent.controller')
const agentRouter=express.Router();

agentRouter.get('/tickets',isAuth,isAuthorized('agent'),getallTickets)
agentRouter.get('/getAssignTickets',isAuth,getassignTickets)
agentRouter.patch('/ticket/:id/status',isAuth,isAuthorized('agent'),updateTicketStatus)
agentRouter.post('/:id/message',isAuth,isAuthorized('agent'),askQuestionToUser)
agentRouter.get('/:id/getMessages',isAuth,isAuthorized('agent'),getAllMessages)

module.exports=agentRouter