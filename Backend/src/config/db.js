const mysql=require('mysql2/promise')
const env=require('dotenv').config()
// console.log("DB HOST:", process.env.DB_HOST)
// console.log("DB PORT:", process.env.DB_PORT)
// console.log("DB USER:", process.env.DB_USER)
// console.log("DB NAME:", process.env.DB_NAME)
const db=mysql.createPool(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        port:process.env.DB_PORT,
        database:process.env.DB_NAME,
        ssl: {
        rejectUnauthorized: false
    }
    }
)
const checkConn=async()=>{
    try {
        const res=await db.execute('show tables')
        console.log(res)
    
        console.log("db connected successfully")
    } catch (error) {
        console.log("database connection error",error)
    }

}
checkConn()

module.exports=db