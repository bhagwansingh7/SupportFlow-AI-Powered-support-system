const jwt=require('jsonwebtoken')
const env=require('dotenv').config()
const db=require('../config/db')
const {getuser}=require('../controllers/user.controller')
const isAuth = async(req, res, next) => {
    // console.log('data is',req.body)
    // console.log('jwt token:',process.env.JWT_SECRET)
    try {
        const token = req.cookies.token;
        // console.log('token in is auth:',token)
        if (!token) {
            
            return res.status(401).json({
                message: 'User not authenticated'
            });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            
            return res.status(401).json({
                message:'user not authenticated'
            })
        }
        
        const id=decoded.id
        
        const [users]=await db.execute(
            `select * from users where id=?`,[id]
        )
        const user=users[0]
        if(!user){
                return res.status(404).json({
                message:'user not found'
            })
        }
        req.user=user
        // console.log("user is :",user)

         next();

    } catch (error) {
        console.log('is Auth error to find the user',error)
        return res.status(401).json({
            message: 'User not authenticated',
            error:error
        });
    }
};

module.exports = { isAuth };