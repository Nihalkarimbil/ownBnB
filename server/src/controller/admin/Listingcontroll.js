const Listing = require("../../Models/Listing");
const CustomError = require("../../Middleware/CustomError")

const allListings = async (req, res, next) => {
    const Listings = await Listing.find().populate("host", "username email profileimage")
    if (!Listings) {
        return next(new CustomError("No Listings Found", 404))
    }

    res.status(200).json(Listings)
}

const approveListing = async (req, res, next) => {
    const list = await Listing.findById(req.params.id)
    if (!list) {
        return next(new CustomError("No Listings Found", 404))
    }
    list.approved = true;
    await list.save()
    res.status(200).json({ message: "Listing Approved", listing: list })
}

const deletelist = async (req, res, next) => {
    const deletelst = await Listing.findByIdAndDelete(req.params.id)
    if (!deletelst) {
        return next(new CustomError("No Listings Found", 404))
    }
    res.status(200).json("Listing Deleted")
}

const getlistbycategory = async (req, res, next) => {

    const listbycategory = await Listing.find({ category: req.params.category }).populate("host", "username email profileimage")

    if (!listbycategory) {
        return next(new CustomError("No Listings Found", 404))
    }
    res.status(200).json(listbycategory)

}

const getByid= async (req, res, next) => {

    const list= await Listing.findById(req.params.id).populate("host", "username email profileimage")
    if(!list){
        return next(new CustomError("No Listings Found", 404))
    }
    res.status(200).json(list)
}




module.exports = {
    allListings,
    approveListing,
    deletelist,
    getlistbycategory,
    getByid
}