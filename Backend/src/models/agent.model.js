const db=require('../config/db')

//getAssignTicket

const getAssignTickets=async(userid)=>{
    try {
        const [tickets]=await db.execute(
            `select * from tickets where assigned_to=?`,[userid]
        )
        return tickets
    } catch (error) {
        throw error
        
    }
}

module.exports={getAssignTickets}