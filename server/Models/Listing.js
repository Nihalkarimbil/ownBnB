
const mongoose=require("mongoose")

const Listingschema= new mongoose.Schema({
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { 
        city: { type: String, required: true },
        country: { type: String, required: true },
    },
    pricePerNight: { type: Number, required: true },
    images: [{ type: String, required: true }],
    rating: { type: String , default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    createdAt: { type: Date, default: Date.now },

})

module.exports=mongoose.model("Listing",Listingschema)