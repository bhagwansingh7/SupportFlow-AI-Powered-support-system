const {getAssignTickets} =require('../models/agent.model')
const getassignTickets=async(req,res)=>{
    try {
        const userId=req.user.id

        const tickets=await getAssignTickets(userId)
        res.status(201).json({
            message:'all assignetickets',
            tickets
        },
    )
    } catch (error) {
        res.status(401).json({
            message:'error in fetching assign tickets',
            error:error.message
        })
        
    }
}

module.exports={getassignTickets}