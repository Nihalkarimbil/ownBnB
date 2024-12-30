const Listing=require("../../Models/Listing")
const CustomError= require("../../Middleware/CustomError")

const viewbycategory=async(req,res,next)=>{

    const listcategory= await Listing.find({category:req.params.category}).populate("host", "username email") 
    if(!listcategory){
        return next(new CustomError("no listings for this category",404))
    }
    res.status(200).json(listcategory)
}

const viewlistbyid = async(req,res,next)=>{

    const listings = await Listing.findById(req.params.id).populate("host", "username email profileimage") 
      

    if(!listings){
        return next (new CustomError('Product with this ID is not found', 404))
    } 

    res.status(200).json(listings)

}

const viewall= async(req,res,next)=>{

    const alll= await Listing.find().populate("host", "username email") 
    if(!alll){
        return next(new CustomError("no listings found",404))
    }
    res.status(200).json(alll)
}

const getListofhost= async(req,res,next)=>{
    const allListings = await Listing.find({ host: req.params.id }).populate(
        "host",
        "username email profileimage"
    );

    if (!allListings) {
        return next(new CustomError("no listings find", 404));
    }
    res.status(200).json(allListings);
}


module.exports={
    viewbycategory,
    viewlistbyid,
    viewall,
    getListofhost
}