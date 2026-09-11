const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const env=require('dotenv').config()
const {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail
}=require('../models/user.model')


const registerUser=async(req,res)=>{
    const userdata=req.body
    try {
        const user=await createUser(userdata)
        res.status(201).json({
            'message':"user created successfully",
            user
        })
        
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }

}

//getusers
const getusers=async(req,res)=>{
    try {
        const users=await getAllUsers();
        res.status(200).json(
            users
        )
        
    } catch (error) {
        console.log(error)
        res.status(401).json('error in fetching users',error)
    }
}
const getuser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to get user",
            error: error.message
        });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (user.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        

        const isCheck = await bcrypt.compare(password, user.password);

        if (!isCheck) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        );
        //cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: "lax"
        });
        const { password: _, ...safeUser } = user;

        return res.status(200).json({
            'message':"user login successfully",
            user:safeUser
            
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



module.exports={registerUser,getusers,getuser,loginUser}