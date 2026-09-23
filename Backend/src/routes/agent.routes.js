const express=require('express');
const { isAuth } = require('../middlewares/isAuth.middleware');
const { isAuthorized } = require('../middlewares/isAuthorized.middleware');
const { getallTickets } = require('../controllers/ticket.controller');
const {getassignTickets, updateTicketStatus, askQuestionToUser, getticketActivity}=require('../controllers/agent.controller')
const agentRouter=express.Router();

agentRouter.get('/tickets',isAuth,isAuthorized('agent'),getallTickets)
agentRouter.get('/getAssignTickets',isAuth,getassignTickets)
agentRouter.patch('/:id/status',isAuth,isAuthorized('agent'),updateTicketStatus)
agentRouter.post('/:id/message',isAuth,isAuthorized('agent'),askQuestionToUser)
agentRouter.get('/:id/getActivity',isAuth,isAuthorized('agent'),getticketActivity)

module.exports=agentRouter