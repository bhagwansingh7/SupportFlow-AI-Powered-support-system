const express=require('express');
const { registeragent,getagents, assigntickets,getUsers,getalltickets } = require('../controllers/admin.controller');
const adminRouter=express.Router();
const {isAuthorized} =require ('../middlewares/isAuthorized.middleware');
const { isAuth } = require('../middlewares/isAuth.middleware');

adminRouter.post('/agents',isAuth,isAuthorized("admin"),registeragent)
adminRouter.get('/getAllAgents',isAuth,isAuthorized('admin'),getagents)
adminRouter.get('/getAllUsers',isAuth,isAuthorized('admin'),getUsers)
adminRouter.get('/getAllTickets',isAuth,isAuthorized('admin'),getalltickets)




module.exports=adminRouter;