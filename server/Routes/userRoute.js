const express = require("express");
const Router = express.Router();
const tryCatch = require("../Middleware/tryCatch");
const userController = require("../controller/userController");
const Listingcontroller = require("../controller/User/userListcontroller");
const wishlistcontroll = require("../controller/User/userwishlistcontroll");
const { userAuthMiddleware } = require("../Middleware/Authentication");

Router
    .get("/allList", tryCatch(Listingcontroller.viewall))
    .post("/signup", tryCatch(userController.userRegistration))
    .post("/signin", tryCatch(userController.userLogin))
    .get("/listby/:category", tryCatch(Listingcontroller.viewbycategory))
    .get("/getby/:id", tryCatch(Listingcontroller.viewlistbyid))
    .post("/addwish",userAuthMiddleware,tryCatch(wishlistcontroll.addtowishlist))
    .delete("/removewish",userAuthMiddleware,tryCatch(wishlistcontroll.removewish))
    .get("/userwish", userAuthMiddleware, tryCatch(wishlistcontroll.wishitems));

module.exports = Router;
