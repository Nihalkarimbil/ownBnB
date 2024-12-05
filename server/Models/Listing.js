const { required } = require("joi");
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
  category: {type:String ,required:true},
  trending:{type:Boolean,default:false},
  new:{type:Boolean,default:true},
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  createdat: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Listing", Listingschema);
