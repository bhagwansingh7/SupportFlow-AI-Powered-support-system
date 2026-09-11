const mysql=require('mysql2/promise')
const env=require('dotenv').config()

const db=mysql.createPool(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        port:process.env.DB_PORT,
        database:process.env.DB_NAME
    }
)
const checkConn=async()=>{
    try {
        const res=await db.execute('show tables')
        console.log(res)
    
        console.log("db connected successfully")
    } catch (error) {
        console.log("database error",error)
    }

}
checkConn()

module.exports=db