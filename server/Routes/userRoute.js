const express=require("express")
const Router=express.Router()
const tryCatch=require("../utils/tryCatch")
const userController=require("../controller/userController")
const Listingcontroller=require("../controller/User/userListcontroller")
const wishlistcontroll= require("../controller/User/userwishlistcontroll")

Router
    .post("/signup",tryCatch(userController.userRegistration))
    .post("/signin",tryCatch(userController.userLogin))
    .get("/listby/:category",tryCatch(Listingcontroller.viewbycategory))
    .get("/getby/:id",tryCatch(Listingcontroller.viewlistbyid))
    .post("/addwish",tryCatch(wishlistcontroll.addtowishlist))
    .delete("/removewish",tryCatch(wishlistcontroll.removewish))
    .get("/userwish",tryCatch(wishlistcontroll.wishitems))


module.exports=Router