const express=require('express')
const router=express.Router()
const {isAuth}=require('../middlewares/isAuth.middleware')
const {isAuthorized}=require('../middlewares/isAuthorized.middleware')


const {
    registerUser,
    getusers,
    getuser,
    loginUser,
    getCurrentUser,
    logout
}=require('../controllers/user.controller')

router.post('/register',registerUser)
router.get('/getallusers',isAuth,isAuthorized("admin"),getusers)
router.get('/getUserById/:id',getuser)
router.post('/login',loginUser)
router.get('/me',getCurrentUser)
router.get('/logout',logout)



module.exports=router