const db=require('../config/db')
const bcrypt=require('bcrypt')
//or register as an agent
const registerAgent=async(agentData)=>{
    const {name,email,password}=agentData
    console.log("agentdata is:",agentData)
    try {
        const hashedPassword=await bcrypt.hash(password,10);
        const [agent]=await db.execute(
            `insert into  users (name,email,password,role) values (?,?,?,?)`,
            [name,email,hashedPassword,"agent"]
        )
        return agent
    } catch (error) {

        console.log("error in agent registration")
        throw error
    }

}
//get agent by status
const getAllAgents=async()=>{
    try {
        const [agent]=await db.execute(`select * from users where role=?`,['agent']);
        return agent
    } catch (error) {
        throw error
    }

}
//getAllUsersRather than admin only users
const getAllUsers=async()=>{
    try {
        const [users]=await db.execute(`SELECT * FROM users where role<>"admin"`)
        return users
    } catch (error) {
        throw error
    }
}

const getAllTickets=async()=>{
    try {
        const [tickets]=await db.execute(`SELECT * FROM tickets`)
        return tickets
    } catch (error) {
        throw error
    }
}


//assign-tickets to  the agents

const assignTickets=async(ticketId,agentId)=>{
    console.log("ticket id is",ticketId)
    console.log(agentId)
    try {
        const [result]=await db.execute(
            `UPDATE tickets
             SET assigned_to = ?
             WHERE id = ?
             AND assigned_to IS NULL`,
            [agentId,ticketId]
        )

        return result
    } catch (error) {
        console.log(error)
        throw error
        
    }

}

//delete a user
const deleteUser=async(id)=>{
    console.log(id)
    try {
        const [result]=await db.execute(`DELETE FROM users where id=?`,[id])
        return result
    } catch (error) {
        throw error
    }

}
//updateUserRole
const updateUser=async(id,newRole)=>{
    try {
        const [result]=await db.execute(`update users set role=?
            where id=?`,[newRole,id])
        return result

    } catch (error) {
        throw error
    }

}


module.exports={registerAgent,getAllAgents,assignTickets,getAllUsers,
    getAllTickets,deleteUser,updateUser
}