const Express = require("express");
const Router = Express.Router();
const AdminListing = require("../controller/admin/Listingcontroll")
const Hostcontroll = require("../controller/admin/hostControll")
const Usercontroll = require("../controller/admin/Usercontroller")
const revenew = require("../controller/admin/Revenewcontroll")
const { adminAuth } = require("../Middleware/Authentication")
const tryCatch = require("../Middleware/tryCatch")

Router
    .get("/allListings", adminAuth, tryCatch(AdminListing.allListings))
    .put("/aprovelist/:id", adminAuth, tryCatch(AdminListing.approveListing))
    .delete("/deletelist/:id", adminAuth, tryCatch(AdminListing.deletelist))
    .get("/getHosts", adminAuth, tryCatch(Hostcontroll.getHosts))
    .get("/getHostby/:id", adminAuth, tryCatch(Hostcontroll.getHostbyid))
    .get("/getlistof/:category", adminAuth, tryCatch(AdminListing.getlistbycategory))
    .get("/getallusers", adminAuth, tryCatch(Usercontroll.getUsers))
    .get("/revenew", adminAuth, tryCatch(revenew.getrevenew))
    .get("/getlistby/:id",adminAuth,tryCatch(AdminListing.getByid))
    .get("/getblockedusers",adminAuth,tryCatch(Usercontroll.getBlockedUsers))
    .get("/getuserby/:id",adminAuth,tryCatch(Usercontroll.getuserByid))
    .put("/updateuser/:id",adminAuth,tryCatch(Usercontroll.updateuser))
    .get("/getuserbooking/:id",adminAuth,tryCatch(Usercontroll.getuserbooking))
    .get("/gethostlist/:id",adminAuth,tryCatch(Hostcontroll.gethostlist))

module.exports = Router

