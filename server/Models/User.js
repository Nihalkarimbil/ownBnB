const mongoose= require("mongoose")

const userschema= new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['guest', 'host'], default: 'guest' },
    profileimage: { type: String, default: 'https://i.pinimg.com/736x/ad/57/b1/ad57b11e313616c7980afaa6b9cc6990.jpg' },
    admin:{type:Boolean, default: false},
    blocked:{type:Boolean,default:false}

})

module.exports= mongoose.model("User",userschema)