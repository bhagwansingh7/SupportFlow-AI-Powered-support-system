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
    logout,
    sendResponseToagent,
    getUserticketActivity
}=require('../controllers/user.controller')

router.post('/register',registerUser)
router.get('/getallusers',isAuth,isAuthorized("admin"),getusers)
router.get('/getUserById/:id',getuser)
router.post('/login',loginUser)
router.get('/me',getCurrentUser)
router.get('/logout',logout)
router.post('/ticket/:id/message',isAuth,isAuthorized('user'),sendResponseToagent)
router.get('/ticket/:id/activity',isAuth,isAuthorized('user'),getUserticketActivity)



module.exports=router