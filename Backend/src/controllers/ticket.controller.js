
const {
    createTicket,
    getAllTickets,
    deleteTicket,
    getTicketById
}=require('../models/ticket.model')





const getallTickets=async(req,res)=>{
    try {
        const tickets=await getAllTickets();
        res.status(201).json(tickets)
    } catch (error) {
        res.status(401).json({
            message:'ticket not found',
            error
        })
        
    }
}

//create tickets
const createticket=async(req,res)=>{
    const ticketData=req.body
    try {

        const ticket=await createTicket(ticketData,req.user.id)
        res.status(201).json(ticket)
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message:'error in ticket creation',
            error
        })
    }

}

//delete a ticket

const deleteTicketById=async(req,res)=>{
    const {id}=req.params
    try {
        const ticket=await deleteTicket(id,req.user.id)
        res.status(201).json({
            message:'ticket deleted successfully'
        })
        
    } catch (error) {
        res.status(401).json({
            message:"error in deleting ticket",
            error:error.message
        })
        
    }
}
//getTicketById

const getTicket=async(req,res)=>{
    const {id}=req.params
    try {
        const ticket=await getTicketById(id);
        res.status(201).json(ticket)
        
    } catch (error) {
        res.status(401).json({
            message:'error in get ticket by id',
            error:error.message
        })
    }
}



module.exports={getallTickets,createticket,deleteTicketById,
    getTicket
}