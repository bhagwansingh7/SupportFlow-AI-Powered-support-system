const express=require('express')
const router=express.Router()


const {
    registerUser,
    getusers,
    getuser,
    loginUser
}=require('../controllers/user.controller')

router.post('/register',registerUser)
router.get('/getallusers',getusers)
router.get('/getUserById/:id',getuser)
router.post('/login',loginUser)



module.exports=router