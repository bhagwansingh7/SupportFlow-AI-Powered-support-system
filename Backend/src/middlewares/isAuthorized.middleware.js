const express=require('express')
const env=require('dotenv').config()

const isAuthorized=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message:'access denied'
            });
        }
        next();
    }
}

module.exports={isAuthorized}