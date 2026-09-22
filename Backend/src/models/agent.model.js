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

//update status of asssign tickets

const updateStatus=async(ticketStatus,ticketId)=>{
    console.log("ticketstatus",ticketStatus)
    console.log("ticketId",ticketId)
    try {
        const [result]=await db.execute(`
            update tickets set status=?,
            updated_at = NOW()
             where id=?
            `,[ticketStatus,ticketId])
            return result
    } catch (error) {
        throw error
    }

}

//ask question to user
const askQuestion = async (ticket_id, sender_id, message) => {
    try {
        const [response] = await db.execute(
            `INSERT INTO ticket_messages (ticket_id, sender_id, message)
             VALUES (?, ?, ?)`,
            [ticket_id, sender_id, message]
        );

        return response;

    } catch (error) {
        throw error;
    }
};


//get all messages 

const getMessages = async (ticket_id, user_id) => {
    try {
        const [response] = await db.execute(
            `SELECT message
             FROM ticket_messages
             WHERE sender_id = ?
             AND ticket_id = ?
             ORDER BY created_at ASC`,
            [user_id, ticket_id]
        );

        return response;

    } catch (error) {
        throw error;
    }
};
module.exports={getAssignTickets,updateStatus,askQuestion,getMessages}