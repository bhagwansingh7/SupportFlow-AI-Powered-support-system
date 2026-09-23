//create a user or register a user
const db=require('../config/db')
const bcrypt=require('bcrypt')

const createUser=async(userdata)=>{
    const {name,email,password}=userdata;
    try {
        const hashedPassword=await bcrypt.hash(password,10)
        const [user]=await db.execute(
            `insert into users (name,email,password) 
            values (?,?,?)`,
            [name,email,hashedPassword]
        )

        return user
        
    } catch (error) {
        console.log(error)
        return error
    }

}

//get all users 

const getAllUsers=async()=>{
    try {
        const [users]=await db.execute(`select * from users`)
        return users
        
    } catch (error) {
        console.log(error)
        throw error
    }
}
//get user by id
const getUserById=async(id)=>{
    try {
        const [users]=await db.execute(
            `select * from users where id=?`,[id]
        )

        return users[0]


    } catch (error) {
        console.log(error)
        throw error
    }
}

//for login auth getuser by email

const getUserByEmail=async(email)=>{
    try {
        const [users]=await db.execute(
            `select * from users where email=?`,[email]
        )
        return users[0]
        
    } catch (error) {
        throw error
        
    }
}


//send a response on ticketQuery
const sendResponse=async(ticketId,userId,message)=>{

    try {

        const [result] = await db.execute(
            `SELECT id, created_by
             FROM tickets
             WHERE id = ?`,
            [ticketId]
        );

        if (result.length === 0) {
            const error = new Error("Ticket not found");
            error.status = 404;
            throw error;
        }

        const ticket = result[0];

        // 2. Authorization check
        if (ticket.created_by !== userId) {
            const error = new Error(
                "You are not authorized to respond to this ticket"
            );
            error.status = 403;
            throw error;
        }

        const [response]=await db.execute(`
            insert into ticket_messages (ticket_id,sender_id,message) values(?,?,?)
            `,
            [ticketId,userId,message])
        

        //update ticket activity
        const [rows] = await db.execute(
            `SELECT new_value
            FROM ticket_activity
            WHERE ticket_id = ? AND user_id = ? AND action = ?`,
            [ticketId, userId, "response_sent"]
        );

        if (rows.length === 0) {
    // First message
            await db.execute(
            `INSERT INTO ticket_activity
            (ticket_id, user_id, action, old_value, new_value)
            VALUES (?, ?, ?, ?, ?)`,
            [ticketId, userId, "response_sent", null, message]
    );
} else {
    // Message already exists
    const old_value = rows[0].new_value;

    await db.execute(
        `insert into ticket_activity (ticket_id, user_id, action, old_value, new_value)
         values (?,?,?,?,?)`,
        [ ticketId, userId, "response_sent",old_value,message]
    );
}



        return response

        
    } catch (error) {
        throw error
    }

}

//getTicketActivity
const TicketActivity = async (ticket_id, user_id) => {
    try {
        const [response] = await db.execute(
            `SELECT ta.*
             FROM ticket_activity ta
             JOIN tickets t ON ta.ticket_id = t.id
             WHERE ta.ticket_id = ?
             AND t.created_by = ?
             ORDER BY ta.created_at ASC`,
            [ticket_id, user_id]
        );

        if (response.length === 0) {
            return null;
        }

        return response;

    } catch (error) {
        throw error;
    }
};


module.exports={createUser,getAllUsers,
    getUserById,
    getUserByEmail,
    sendResponse,
    TicketActivity
}
