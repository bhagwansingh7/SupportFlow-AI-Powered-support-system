const db=require('../config/db')

const createTicket=()=>{

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

const getTicketById=()=>{

}

const getUnResolvedTicekt=()=>{

}

module.exports={getAllTickets}