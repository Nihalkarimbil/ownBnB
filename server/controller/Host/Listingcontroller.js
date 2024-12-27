const Listing = require("../../Models/Listing");
const User = require("../../Models/User");
const Costomerror = require("../../Middleware/Costomerror");
const { joilistingschema } = require("../../utils/validation");

const allListing = async (req, res, next) => {

    const allListings = await Listing.find({ host: req.user.id }).populate(
        "host",
        "username email profileimage"
    );

    if (!allListings) {
        return next(new Costomerror("no listings find", 404));
    }

    res.status(200).json(allListings);
};



const addlisting = async (req, res, next) => {

    const { value, error } = joilistingschema.validate(req.body);

    if (error) {
        return next(new Costomerror(error));
    }

    const { title, description, city, country, price, category } = value;

    const host = req.user.id;
    const validHost = await User.findById(host);
    if (!validHost) {
        return next(new Costomerror("Host not found.", 404));
    }

    if (validHost.role === "guest") {
        validHost.role = "host";
        await validHost.save();
    }

    const images = req.files?.map((file) => file.path) || [];

    const newListing = new Listing({
        host,
        title,
        description,
        price,
        images,
        city,
        country,
        category,
    });

    const savedListing = await newListing.save();

    res.status(201).json({
        message: "Listing added successfully!",
        listing: savedListing,
    });
};


const editlisting = async (req, res, next) => {

    const { __v, _id, trending, createdat, ...productData } = req.body;
    const { error } = joilistingschema.validate(productData);
    if (error) {
        return next(new Costomerror("Validation failed: ", 400));
    }

   
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(new Costomerror("Product not found with this ID", 404));
    }

  
    Object.assign(listing, productData);

    if (req.files && Array.isArray(req.files)) {
        const newImages = req.files.map((file) => file.path);
        listing.images = Array.isArray(listing.images) ? listing.images.concat(newImages) : newImages;
    }


    const updatedListing = await listing.save();
  
    res.status(200).json(updatedListing);

};


const deleteListing = async (req, res, next) => {

    const deletelisting = await Listing.findByIdAndDelete(req.params.id);
    if (!deletelisting) {
        return next(new Costomerror("Product with this ID is not found", 404));
    }
    res.status(200).json("listing deleted succesfully");
};

const viewlistbyid = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(new Costomerror("Product with this ID is not found", 404));
    }

    res.status(200).json(listing);
};

const deleteimage = async (req, res, next) => {

    const { imgurl } = req.body;
    const list = await Listing.findById(req.params.id);

    if (!list) {
        return next(new Costomerror("no listings find with this id", 404));
    }
    const imgindex = list.images.indexOf(imgurl);
    if (imgindex === -1) {
        return next(new Costomerror("Image not found in the listing", 404));
    }

    list.images.splice(imgindex, 1);

    await list.save();
    res.status(200).json("image deleted succesfully");
};


module.exports = {
    addlisting,
    editlisting,
    allListing,
    deleteListing,
    viewlistbyid,
    deleteimage,
    
};
