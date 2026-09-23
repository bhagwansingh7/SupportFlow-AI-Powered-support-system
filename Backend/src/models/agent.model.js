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
// const askQuestion = async (ticket_id, sender_id, message) => {
//     try {
//         const [response] = await db.execute(
//             `INSERT INTO ticket_messages (ticket_id, sender_id, message)
//              VALUES (?, ?, ?)`,
//             [ticket_id, sender_id, message]
//         );
//         const old_val=await db.execute(`select (new_val) from ticket_activity where ticket_id=? and 
//             sender_id=?`,[ticket_id,sender_id]);
//         const resp=await db.execute(`update ticket_activity set new_val=? ,old_val=? where ticket_id=? and sender_id=?`,
//             [message,old_val,ticket_id,sender_id])



//         return response;

//     } catch (error) {
//         throw error;
//     }
// };

const askQuestion = async (ticket_id, sender_id, message) => {
    try {
        const [response] = await db.execute(
            `INSERT INTO ticket_messages (ticket_id, sender_id, message)
             VALUES (?, ?, ?)`,
            [ticket_id, sender_id, message]
        );

        const [rows] = await db.execute(
            `SELECT new_value
            FROM ticket_activity
            WHERE ticket_id = ? AND user_id = ? AND action = ?`,
            [ticket_id, sender_id, "message_sent"]
        );

        if (rows.length === 0) {
    // First message
            await db.execute(
            `INSERT INTO ticket_activity
            (ticket_id, user_id, action, old_value, new_value)
            VALUES (?, ?, ?, ?, ?)`,
            [ticket_id, sender_id, "message_sent", null, message]
    );
} else {
    // Message already exists
    const old_value = rows[0].new_value;

    await db.execute(
        `UPDATE ticket_activity
         SET old_value = ?, new_value = ?
         WHERE ticket_id = ? AND user_id = ? AND action = ?`,
        [old_value, message, ticket_id, sender_id, "message_sent"]
    );
}
       
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