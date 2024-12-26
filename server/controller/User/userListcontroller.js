const listing=require("../../Models/Listing")
const customerror= require("../../Middleware/Costomerror")

const viewbycategory=async(req,res,next)=>{

    const listcategory= await listing.find({category:req.params.category}).populate("host", "username email") 
    if(!listcategory){
        return next(new customerror("no listings for this category",404))
    }
    res.status(200).json(listcategory)
}

const viewlistbyid = async(req,res,next)=>{

    const listings = await listing.findById(req.params.id).populate("host", "username email profileimage") 
      

    if(!listings){
        return next (new customerror('Product with this ID is not found', 404))
    } 

    res.status(200).json(listings)

}

const viewall= async(req,res,next)=>{

    const alll= await listing.find().populate("host", "username email") 
    if(!alll){
        return next(new customerror("no listings found",404))
    }
    res.status(200).json(alll)
}

const getListofhost= async(req,res,next)=>{
    const allListings = await listing.find({ host: req.params.id }).populate(
        "host",
        "username email profileimage"
    );

    if (!allListings) {
        return next(new customerror("no listings find", 404));
    }
    res.status(200).json(allListings);
}


module.exports={
    viewbycategory,
    viewlistbyid,
    viewall,
    getListofhost
}