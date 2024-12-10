const User =require("../Models/User")
const {joiuserschema}=require("../Models/validation")
const costomeror= require("../Middleware/Costomerror")
const bcrypt=require("bcrypt")
const JWT= require("jsonwebtoken")

const userRegistration =async(req,res,next)=>{
    const {value,error}=joiuserschema.validate(req.body)

    if(error){
        return next(new costomeror(error))
    }
    const {username,email,password}=value
    
    const hashpassword= await bcrypt.hash(password,5)
    const newUser= new User({username,email,password:hashpassword})
    await newUser.save()

    const token =JWT.sign({email:email,name:username},process.env.JWT_SECRET,{expiresIn:"1d"})
   
    res.status(200).json({ status: 'succes', message: 'Registerd succesfully', data: newUser ,token})
}
  
const userLogin= async(req,res,next)=>{
    const {value,error}=joiuserschema.validate(req.body)
    if(error){
        return next(new costomeror(error))
    }
    const {email,password}=value

    const user= await User.findOne({email})
    if(!user){
        return res.status(404).json("no user find with this eamil")
    }
    const validpass= await bcrypt.compare(password,user.password)
    if(!validpass){
        return res.status(401).json("invalid credentials")
    }
    const token =JWT.sign({id:user._id,email:user.email,name:user.username},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.status(200).json({
        message:"login succesfully",
        token,
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            image:user.profileimage
        }
    })
}


module.exports={
    userRegistration,
    userLogin
}