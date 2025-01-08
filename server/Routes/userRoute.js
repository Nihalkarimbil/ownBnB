const express = require("express");
const Router = express.Router();
const tryCatch = require("../Middleware/tryCatch");
const userController = require("../controller/userController");
const Listingcontroller = require("../controller/User/userListcontroller");
const wishlistcontroll = require("../controller/User/userwishlistcontroll");
const { userAuthMiddleware } = require("../Middleware/Authentication");
const userReview= require("../controller/User/UserReviewcontroller");
const Bookingcontroll = require("../controller/User/Bookingcontroll");
const upload = require("../Middleware/imageupload")


Router
    .get("/allList", tryCatch(Listingcontroller.viewall))
    .get("/newitem",tryCatch(Listingcontroller.newitem))
    .post("/signup", tryCatch(userController.userRegistration))
    .post("/signin", tryCatch(userController.userLogin))
    .get("/listby/:category", tryCatch(Listingcontroller.viewbycategory))
    .get("/getby/:id", tryCatch(Listingcontroller.viewlistbyid))

    .post("/addwish",userAuthMiddleware,tryCatch(wishlistcontroll.addtowishlist))
    .delete("/removewish",userAuthMiddleware,tryCatch(wishlistcontroll.removewish))
    .get("/userwish", userAuthMiddleware, tryCatch(wishlistcontroll.wishitems))

    .post("/addreview",userAuthMiddleware,tryCatch(userReview.addreview))
    .get("/getreviewby/:id",tryCatch(userReview.getreviewbyid))

    .post("/addbooking",userAuthMiddleware,tryCatch(Bookingcontroll.addbooking))
    .get("/sessions/:sessionId",userAuthMiddleware,tryCatch(Bookingcontroll.sessiondetails))
    .get("/getbooking/:sessionId",userAuthMiddleware,tryCatch(Bookingcontroll.getbooking))
    .get("/getuserbooking",userAuthMiddleware, tryCatch(Bookingcontroll.getuserbooking))
    .get("/Getbookingby/:id",userAuthMiddleware, tryCatch(Bookingcontroll.getOnebooking))

    .put("/updateprofileimg",userAuthMiddleware,upload.single("profileimage"),tryCatch(userController.userProfileupdate))
    .get("/activeuser",userAuthMiddleware,tryCatch(userController.activeuser))
    
    .get("/gethost/:id",tryCatch(userController.hostdtls))
    .get("/getlistofhost/:id",tryCatch(Listingcontroller.getListofhost))
   

module.exports = Router;
