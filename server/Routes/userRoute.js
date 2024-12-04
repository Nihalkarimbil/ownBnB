const express=require("express")
const Router=express.Router()
const tryCatch=require("../utils/tryCatch")
const userController=require("../controller/userController")


Router
    .post("/signup",tryCatch(userController.userRegistration))
    .post("/signin",tryCatch(userController.userLogin))


module.exports=Router