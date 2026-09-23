const {getAssignTickets,updateStatus, askQuestion, getMessages, getTicketActivity} =require('../models/agent.model')
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
    const  agentId =req.user.id
    const { status }=req.body
    const { id }=req.params
    console.log(status)
    console.log(req.params,id)
    console.log( agentId , req.user.id)
    
    try {
        const response=await updateStatus(status,id,agentId);
        console.log(response)
        if(response.affectedRows===0){
               return res.status(403).json({
                message: "You are not authorized to modify this ticket"
            });
        }
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
    if (!message || message.trim() === "") {
            return res.status(400).json({
                message: "Message is required"
            });
        }

    try {

        const response=await askQuestion(id,sender_id,message)
        if (!response) {
            return res.status(403).json({
                message: "You are not authorized to send a message to this ticket"
            });
        }
        res.status(200).json({
             message: "Message sent successfully",
            response
        })
        
    } catch (error) {
        res.status(401).json({
            message:'error in sending message to user',
            error:error.message

        })
    }
}

//get all questions

const getticketActivity=async(req,res)=>{
    const sender_id  = req.user.id
    const { id }=req.params

    try {
        const response=await getTicketActivity(id,req.user.id)
        if (!response) {
            return res.status(403).json({
                message: "You are not authorized to view this ticket"
            });
        }
        res.status(200).json({
            message:'ticket messages',
            response
        })
        
    } catch (error) {
        res.status(401).json({
            message:'error in sending message to user',
            error:error.message

        })
    }
}



module.exports={getassignTickets,updateTicketStatus,askQuestionToUser,getticketActivity}