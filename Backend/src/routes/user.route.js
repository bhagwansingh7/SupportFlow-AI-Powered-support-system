const express=require('express')
const router=express.Router()
const {isAuth}=require('../middlewares/isAuth.middleware')


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
router.get('/me',isAuth,getCurrentUser)



module.exports=router