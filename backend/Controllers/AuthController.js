const UserModal = require("../Models/User");
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

const signup= async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user= await UserModal.findOne({email});
        if(user){
            return res.status(400)
                .json({message:'User is already exist, you can login',success:false});
        }
        const userModel=new UserModal({name,email,password});

        userModel.password=await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({
                message:"Signup successfully",
                success:true
            })

    }catch (err){
        res.status(500)
            .json({
                message:"internal server error",
                success:false,
            })
    }
}

const login= async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user= await UserModal.findOne({email});
        const errormsg='Auth failed email or password is wrong'
        if(!user){
            return res.status(403)
                .json({message:errormsg,success:false});
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({message:errormsg,success:false});
        }
        
        const jwtToken=jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'4hr'}
        )  

        res.status(200)
            .json({
                message:"login success",
                success:true,
                jwtToken,
                email,
                name:user.name
            })

    }catch (err){
        res.status(500)
            .json({
                message:"internal server error",
                success:false,
            })
    }
}


module.exports={
    signup,
    login
}