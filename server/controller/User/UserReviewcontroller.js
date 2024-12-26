const Review = require("../../Models/Review")
const Costomerror= require("../../Middleware/Costomerror")

 
const addreview= async(req,res,next)=>{
    const {listing,rating,comment}= req.body

    if (!listing||!rating){
        return next(new Costomerror("listing ratings are required",400))
    }

    const newReview= new Review({
        user:req.user._id,
        listing,
        rating,
        comment
    })
    await newReview.save()

    res.status(201).json({
        succes:true,
        message:"Review added successfully",
        review:newReview
    })

    
    
}

const getreviewbyid= async(req,res,next)=>{
    
    
    const review =await Review.find({listing:req.params.id}).populate("user","username email profileimage")
    if(!review){
        return next(new Costomerror("No review find to this Listing",400))
    }

    res.status(200).json(review)
}

module.exports={
    addreview,
    getreviewbyid
}