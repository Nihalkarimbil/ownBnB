const mongoose = require("mongoose");

const bookingschema = new mongoose.Schema({
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
})

module.exports= mongoose.model("Booking",bookingschema)
