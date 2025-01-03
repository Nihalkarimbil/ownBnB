const Booking= require("../../Models/Booking")
const CustomError = require("../../Middleware/CustomError")

const getCompleted= async(req,res,next)=>{
    const reserve= await Booking.find({status:"Completed"}).populate("guest").populate("listing")
    if(!reserve){
        return next(new CustomError("no Booking found"))
    }

    res.status(200).json(reserve)
}

const getpending= async(req,res,next)=>{
    const pending = await Booking.find({status:"pending"}).populate("guest").populate("listing")
    if(!pending){
        return next(new CustomError("no Booking found"))
    }

    res.status(200).json(pending)
}

const getbookingbyid= async(req,res,next)=>{
    const booking= await Booking.findById(req.params.id).populate("listing")
    if(!booking){
        return next(new CustomError("no booking found with this ID"))
    }
    res.status(200).json(booking)
}

module.exports={
    getCompleted,
    getpending,
    getbookingbyid
}