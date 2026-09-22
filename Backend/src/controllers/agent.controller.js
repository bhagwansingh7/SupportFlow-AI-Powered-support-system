const {getAssignTickets,updateStatus, askQuestion, getMessages} =require('../models/agent.model')
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

const updateTicketStatus=async(req,res)=>{
    const { status }=req.body
    const { id }=req.params
    console.log(status)
    console.log(req.params,id)
    try {
        const response=await updateStatus(status,id);
        console.log(response)
        res.status(200).json({
            message:'ticket status update successfully',
            response
        })
        
    } catch (error) {
        res.status(401).json({
            message:'error in status change',
            error:error.message
        })
        
    }

}

const askQuestionToUser=async(req,res)=>{
    const sender_id  = req.user.id
    const { id }=req.params
    const { message }=req.body
    console.log("user is:",req.user.id)
    console.log(id)
    console.log(req.body)
    console.log(message)
    try {

        const response=await askQuestion(id,sender_id,message)
        res.status(200).json({response})
        
    } catch (error) {
        res.status(401).json({
            message:'error in sending message to user',
            error:error.message

        })
    }
}

//get all questions

const getAllMessages=async(req,res)=>{
    const sender_id  = req.user.id
    const { id }=req.params
    console.log(req.user.id)
    console.log(id)
    try {
        const response=await getMessages(id,req.user.id)
        res.status(200).json({response})
        
    } catch (error) {
        res.status(401).json({
            message:'error in sending message to user',
            error:error.message

        })
    }
}



module.exports={getassignTickets,updateTicketStatus,askQuestionToUser,getAllMessages}