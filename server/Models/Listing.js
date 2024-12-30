
const mongoose = require("mongoose");

const Listingschema = new mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {type:String ,required:true},
  city: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: String, required: true },
  images: [{ type: String, required: true }],
  rating: { type: String, default: 0 },
  category : {type:String ,required:true},
  trending:{type:Boolean,default:false},
  newitem:{type:Boolean,default:true},
  approved:{type:Boolean,default:false},
  createdat: { type: Date, default: Date.now },
});


const Listing = mongoose.models.Listing || mongoose.model("Listing", Listingschema);

module.exports = Listing;