
const mongoose =require("mongoose")

const wishlistschema=new mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:'User'},
    Listings:[{type:mongoose.Schema.ObjectId,ref:'Listing'}]
})

module.exports=mongoose.model("Wishlist",wishlistschema)