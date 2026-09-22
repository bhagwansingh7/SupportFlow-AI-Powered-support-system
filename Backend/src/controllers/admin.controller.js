const {registerAgent, getAllAgents}=require('../models/admin.model')
const {assignTickets,getAllUsers,
    getAllTickets,
    updateUser,
    deleteUser
} =require('../models/admin.model')
const { deleteTicketById } = require('./ticket.controller')


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
const getagents=async(req,res)=>{
    try {
        const agent=await getAllAgents();
        res.status(201).json(agent)
        
    } catch (error) {
        res.status(201).json({
            message:'error in get the agent',
            error:error.message
        })
    }
}
const getalltickets=async(req,res)=>{
    try {
        const tickets=await getAllTickets();
        res.status(201).json(tickets)
        
    } catch (error) {
        res.status(201).json({
            message:'error in fetching the tickets',
            error:error.message
        })
    }
}
//get users
const getUsers=async(req,res)=>{
    try {

        const users=await getAllUsers();
        res.status(201).json(users)
        

    } catch (error) {
        res.json({
            message:"error in fetching users",
            error:error.message
        })
    }
}
//assign tickets

const assigntickets=async(req,res)=>{
    console.log("the assign ticket route hit ")
    console.log("assign route hit")

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

const updateUserRole=async(req,res)=>{
        const {id}=req.params
        const { role }=req.body
        console.log(id,role)
        try {
            const updatedUser=await updateUser(id,role);
            res.status(201).json({message:'user update successfully',
                updatedUser
            })
            
        } catch (error) {
            res.status(401).json({
                message:"error in update user",
                error:error.message
            })
        }
}

const deleteuser=async(req,res)=>{
    try {
        const result=await deleteUser(id);
            res.status(201).json({message:'user deleted successfully',
                result
            })
        
    } catch (error) {
        res.status(401).json({
                message:"error in delete a user",
                error:error.message
            })
    }
}




module.exports={registeragent,getagents,assigntickets,getUsers,getalltickets,
    deleteuser,
    updateUserRole
}