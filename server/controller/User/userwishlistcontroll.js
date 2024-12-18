const Wishlist = require("../../Models/Wishlist");
const customerror = require("../../Middleware/Costomerror");

const addtowishlist = async (req, res, next) => {
    const {listings } = req.body;
  
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
       
        const newWishlist = new Wishlist({
            user: req.user._id,
            Listings:[listings], 
        });
        await newWishlist.save();
        return res.status(201).json(newWishlist);
    }

    
    if (wishlist.Listings.some((item) => item.toString() === listings.toString())) {
        return res.status(400).json({ message: "Listing already in wishlist" });
    }

    wishlist.Listings.push(listings);
    await wishlist.save();

    res.status(200).json({ message: "Listing added to wishlist", wishList: wishlist });
};

const removewish=async(req,res,next)=>{

    const {userId,listingid}=req.body
    const wishitem=await Wishlist.findOne({user:userId})

    if(!wishitem){
        return next(new customerror("Wishlist not found",404))
    }

    wishitem.Listings = wishitem.Listings.filter((id) => id.toString() !== listingid);

    await wishitem.save()
    res.status(200).json("item removed from wishlist")
}

const wishitems=async(req,res,next)=>{
   
    const wishitem= await Wishlist.find({user:req.user._id}).populate('Listings', 'title rating price images');
    if(!wishitem){
        return next(new customerror("no items in the wishlist"))
    }
    res.status(200).json(wishitem)
}

module.exports={addtowishlist,removewish,wishitems}
