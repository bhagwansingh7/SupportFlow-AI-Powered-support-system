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
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        const { password: _, ...safeUser } = user;
        // console.log('safeUser',safeUser)
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

const getCurrentUser=async(req,res)=>{
    try {
        // console.log("COOKIE:", req.cookies);
        // console.log("TOKEN:", req.cookies?.token);
        // console.log("cookie:",req.cookies)
        const token=req.cookies.token
      
        if(!token){
            res.status(401).json({
                'message':"user not authenticate"
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await getUserById(decoded.id)

        if(!user){
            return res.status(404).json({
                message:'User Not found'
            })
        }
        res.status(201).json({user})



        
    } catch (error) {
        res.status(500).json({
            message:'invalid or expired token',
            error:error.message
        })
    }


}

//logout user

const logout=async (req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            sameSite:"lax",
            secure:false

        })
        res.status(200).json({
            message:"Logged out successfully"
        })
        

        
    } catch (error) {
        res.status(500).json({
            message:'error in logout function',
            error:error.message
        })        
    }
}


module.exports={registerUser,getusers,getuser,loginUser,
    getCurrentUser,logout

}