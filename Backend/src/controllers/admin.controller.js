const {registerAgent, getAgent}=require('../models/admin.model')
const {assignTickets} =require('../models/admin.model')

//registerAgent

const registeragent=async(req,res)=>{
    
    const userdata=req.body
    try {
        const agent=await registerAgent(userdata)
        res.status(201).json({
            message:'agent register successfully',
            agent
        })
        
    } catch (error) {
        res.status(401).json({
            message:'error in agent registration',
            error:error.message
        })
    }

}
//get agent 
const getagent=async(req,res)=>{
    try {
        const agent=await getAgent();
        res.status(201).json(agent)
        
    } catch (error) {
        res.status(201).json({
            message:'error in get the agent',
            error:error.message
        })
    }
}

//assign tickets

const assigntickets=async(req,res)=>{
    try {
        const ticketid=req.params.id
        
        const {agentId}=req.body

        const assign=await assignTickets(ticketid,agentId);
        res.status(201).json({
            message:'ticket assignemet is success full',
            assign
        })
        
    } catch (error) {
        res.status(401).json({
            message:'error in assignment of the tickets',
            error:error.message
        })
    }

}
module.exports={registeragent,getagent,assigntickets}