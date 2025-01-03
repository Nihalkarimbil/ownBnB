const user = require("../../Models/User");
const CustomError= require ("../../Middleware/CustomError")
const Listing = require('../../models/Listing');


const getHosts= async(req,res,next)=>{
    const Hosts= await user.find({role:"host"})
    if(!Hosts){
        return next (new CustomError("No Hosts Found",404))
    }
    res.status(200).json(Hosts)
}

const getHostbyid=async(req,res,next)=>{
    const Host= await user.findById(req.params.id)

    if(!Host){
        return next (new CustomError("No Hosts Found",404))
    }
    res.status(200).json(Host)
}



const gethostlist= async(req,res,next)=>{
    const Hostlist= await Listing.find({host:req.params.id})
    if(!Hostlist){
        return next (new CustomError("No Hosts Found",404))
    }
    res.status(200).json(Hostlist)
}





module.exports={
    getHosts,
    getHostbyid,
    gethostlist
}