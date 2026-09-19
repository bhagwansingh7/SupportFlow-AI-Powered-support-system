const db=require('../config/db')
const {isAuth}=require('../middlewares/isAuth.middleware')
const createTicket = async (ticketData, createdBy) => {
    const {
        title,
        description,
        priority,
        category
    } = ticketData;

    const [ticket] = await db.execute(
        `INSERT INTO tickets 
        (title, description, priority, category, created_by)
        VALUES (?, ?, ?, ?, ?)`,
        [title, description, priority, category, createdBy]
    );

    return ticket.insertId;
};


//delete the ticket

const deleteTicket=async (ticketId,createdBy)=>{
    try {
        const [result]=await db.execute(`
            DELETE FROM tickets WHERE id=? AND created_By=?
            `,[ticketId,createdBy])
        return result

    } catch (error) {
        throw error
    }


}


const getAllTickets= async ()=>{

    try {
        const [tickets]=await db.execute(
            `SELECT * FROM tickets`
        )

        return tickets;
    } catch (error) {
        console.log(error);
        throw error;
        
    }

}
//getAllTicketsByUserId

const getUsersTicket=async(userId)=>{
    try {
        const [tickets]=await db.execute(`
            SELECT * FROM tickets where created_by=?
        `,[userId])
        return tickets
    } catch (error) {
        throw error
    }
}
//get unresolved tickets
const getUnResolvedTickets=async()=>{
    try {
        const [tickets]=await db.execute(`select * from tickets where status=?`,
            ['open']
        );
        return tickets
    } catch (error) {
        throw error
    }

}

const getTicketById=async(id)=>{
    try {

        const [ticket]=await db.execute(`
            SELECT * FROM tickets where id=?
            `,[id])

            return ticket
        
    } catch (error) {
        console.log('error in deleting the ticket',error)
        throw error
    }


}



module.exports={getAllTickets,createTicket,
    deleteTicket,getTicketById,getUnResolvedTickets,
    getUsersTicket
}