const Express = require("express");
const Router = Express.Router();
const AdminListing = require("../controller/admin/Listingcontroll")
const Hostcontroll= require("../controller/admin/hostControll")
const Usercontroll= require("../controller/admin/Usercontroller")
const { adminAuth } = require("../Middleware/Authentication")
const tryCatch= require("../Middleware/tryCatch")

Router
    .get("/allListings",adminAuth,tryCatch(AdminListing.allListings))
    .put("/aprovelist/:id",adminAuth,tryCatch(AdminListing.approveListing))
    .delete("/deletelist/:id",adminAuth,tryCatch(AdminListing.deletelist))
    .get("/getHosts",adminAuth,tryCatch(Hostcontroll.getHosts))
    .get("/getHostby/:id",tryCatch(Hostcontroll.getHostbyid))
    .get("/getlistof/:category",tryCatch(AdminListing.getlistbycategory))
    .get("/getallusers",tryCatch(Usercontroll.getUsers))

module.exports = Router

