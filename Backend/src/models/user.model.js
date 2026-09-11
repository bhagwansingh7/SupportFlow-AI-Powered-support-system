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
module.exports={createUser,getAllUsers,
    getUserById,
    getUserByEmail
}
