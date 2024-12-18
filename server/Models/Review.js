const mongoose = require("mongoose");

const reviewschema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: {type: mongoose.Schema.Types.ObjectId,ref: "Listing",required: true,},
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports=mongoose.model("Review",reviewschema)