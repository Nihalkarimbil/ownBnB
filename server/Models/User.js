const mongoose= require("mongoose")

const userschema= new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['guest', 'host'], default: 'guest' },
    profileimage: { type: String, default: '' },
    admin:{type:Boolean, default: false},
    blocked:{type:Boolean,default:false}

})

module.exports= mongoose.model("User",userschema)