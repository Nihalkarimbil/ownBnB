const express = require("express")
const Router =express.Router()
const tryCatch= require("../Middleware/tryCatch")
const listingcontroller=require("../controller/Host/Listingcontroller")
const upload= require("../Middleware/imageupload")
const {hostAuth} =require("../Middleware/Authentication")
const reservation = require("../controller/Host/Reservation")

Router
    .get("/allListing", hostAuth, tryCatch(listingcontroller.allListing))
    .post("/addlisting",upload.array("images",5),tryCatch(listingcontroller.addlisting))
    .put("/editlisting/:id",hostAuth,upload.array("images",5),tryCatch(listingcontroller.editlisting))
    .delete("/deletelist/:id",hostAuth,tryCatch(listingcontroller.deleteListing))
    .get("/viewby/:id",hostAuth,tryCatch(listingcontroller.viewlistbyid))
    .delete("/deleteimg/:id",tryCatch(listingcontroller.deleteimage))
    .get("/reservations/:id",hostAuth,tryCatch(reservation.getreservation))
    .put("/statusupdate",hostAuth,tryCatch(reservation.updatestatus))
    .get("/getrevenew/:id",tryCatch(reservation.getRevenew))

module.exports=Router
