const express = require("express")
const Router =express.Router()
const tryCatch= require("../utils/tryCatch")
const listingcontroller=require("../controller/Host/Listingcontroller")
const upload= require("../Middleware/imageupload")


Router
    .get ("/allListing",tryCatch(listingcontroller.allListing))
    .post("/addlisting",upload.array("images",5),tryCatch(listingcontroller.addlisting))
    .put("/editlisting/:id",upload.array("images",5),tryCatch(listingcontroller.editlisting))
    .delete("/deletelist/:id",tryCatch(listingcontroller.deleteListing))
    .get("/viewby/:id",tryCatch(listingcontroller.viewlistbyid))


module.exports=Router