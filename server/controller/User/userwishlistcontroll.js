const Wishlist = require("../../Models/Wishlist");
const CustomError = require("../../Middleware/CustomError");


const addtowishlist = async (req, res, next) => {
   
    const {listings } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
        const newWishlist = new Wishlist({
            user: req.user._id,
            Listings:[listings], 
        });
        await newWishlist.save();
        return res.status(201).json(newWishlist)
    }

    wishlist.Listings = wishlist.Listings.filter((item) => item != null);
    
    const isProductInWishlist = wishlist.Listings?.some(list => list.equals(listings))
    if (!isProductInWishlist) {
        wishlist.Listings.push(listings);
        await wishlist.save();
        wishlist = await wishlist.populate('Listings');
        return res.status(200).json(wishlist);
    }

    res.status(200).json({ message: "Listing added to wishlist", wishList: wishlist });
};

const removewish=async(req,res,next)=>{

    const {userId,listingid}=req.body
    const wishitem=await Wishlist.findOne({user:userId})

    if(!wishitem){
        return next(new CustomError("Wishlist not found",404))
    }

    wishitem.Listings = wishitem.Listings.filter((id) => id.toString() !== listingid);

    await wishitem.save()
    res.status(200).json("item removed from wishlist")
}

const wishitems=async(req,res,next)=>{
   
    const wishitem= await Wishlist.find({user:req.user._id}).populate('Listings');
    if(!wishitem){
        return next(new CustomError("no items in the wishlist"))
    }
    res.status(200).json(wishitem)
}

module.exports={addtowishlist,removewish,wishitems}
