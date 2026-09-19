const express=require('express');
const { registeragent,getagent } = require('../controllers/agent.controller');
const adminRouter=express.Router();
const {isAuthorized} =require ('../middlewares/isAuthorized.middleware');
const { isAuth } = require('../middlewares/isAuth.middleware');

adminRouter.post('/agents',isAuth,isAuthorized("admin"),registeragent)
adminRouter.get('/getagent',isAuth,isAuthorized('admin'),getagent)

module.exports=adminRouter;