const {
    getAllTickets
}=require('../models/ticket.model')

const getallTickets=async(req,res)=>{
    try {
        const tickets=await getAllTickets();
        res.status(201).json({tickets})
    } catch (error) {
        res.status(401).json({
            message:'ticket not found',
            error
        })
        
    }
}

module.exports={getallTickets}