const user= require("../../Models/User")
const Booking = require("../../Models/Booking")
const CustomError= require("../../Middleware/CustomError")

const getUsers= async(req,res,next)=>{
    const Users= await user.find({
        blocked:false,
        admin:false
    })
    if (!Users){
        return next(new CustomError("No Users Found",404))
    }
    res.status(200).json(Users)
}
const getuserByid=async(req,res,next)=>{
    const User= await user.findById(req.params.id)

    if(!User){
        return next (new CustomError("No User Found",404))
    }
    res.status(200).json(User)
}


const getBlockedUsers= async(req,res,next)=>{
    const Users= await user.find({blocked:true})
    if (!Users){
        return next(new CustomError("No Users Found",404))
    }
    res.status(200).json(Users)
}

const updateuser=async(req,res,next)=>{
    const User= await user.findById(req.params.id)

    if(!User){
        return next (new CustomError("No User Found",404))
    }
    User.blocked=!User.blocked
    await User.save()
    res.status(200).json(User)
}

const getuserbooking= async(req,res,next)=>{
    const Bookings= await Booking.find({guest:req.params.id}).populate("listing").populate("host")
    if (!Bookings){
        return next(new CustomError("No Bookings Found",404))
    }
    res.status(200).json(Bookings)
}

module.exports={
    getUsers,
    getBlockedUsers,
    getuserByid,
    updateuser,
    getuserbooking
}