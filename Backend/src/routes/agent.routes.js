const express=require('express');
const { isAuth } = require('../middlewares/isAuth.middleware');
const { isAuthorized } = require('../middlewares/isAuthorized.middleware');
const { getallTickets } = require('../controllers/ticket.controller');
const agentRouter=express.Router();

agentRouter.get('/tickets',isAuth,isAuthorized('agent'),getallTickets)

module.exports=agentRouter