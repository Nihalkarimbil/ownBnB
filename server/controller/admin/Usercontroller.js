const user= require("../../Models/User")
const CustomError= require("../../Middleware/CustomError")

const getUsers= async(req,res,next)=>{
    const Users= await user.find()
    if (!Users){
        return next(new CustomError("No Users Found",404))
    }
    res.status(200).json(Users)
}

module.exports={
    getUsers
}