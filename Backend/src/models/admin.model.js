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
const getAgent=async()=>{
    try {
        const [agent]=await db.execute(`select * from users where role=?`,['agent']);
        return agent
    } catch (error) {
        throw error
    }

}


//assign-tickets to  the agents

const assignTickets=async(ticketId,agentId)=>{

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




module.exports={registerAgent,getAgent,assignTickets}