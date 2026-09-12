const express=require('express')
const router=express.Router()


const {
    registerUser,
    getusers,
    getuser,
    loginUser,
    getCurrentUser
}=require('../controllers/user.controller')

router.post('/register',registerUser)
router.get('/getallusers',getusers)
router.get('/getUserById/:id',getuser)
router.post('/login',loginUser)
router.get('/me',getCurrentUser)



module.exports=router