const listing=require("../../Models/Listing")
const customerror= require("../../utils/Costomerror")

const viewbycategory=async(req,res,next)=>{

    const listcategory= await listing.find({category:req.params.category})
    if(!listcategory){
        return next(new customerror("no listings for this category",404))
    }
    res.status(200).json(listcategory)
}

const viewlistbyid = async(req,res,next)=>{

    const listings = await listing.findById(req.params.id).populate("host", "username email") 
      

    if(!listings){
        return next (new customerror('Product with this ID is not found', 404))
    } 

    res.status(200).json(listings)

}


module.exports={viewbycategory,viewlistbyid}