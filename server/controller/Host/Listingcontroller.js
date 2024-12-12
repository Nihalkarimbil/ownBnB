const Listing = require("../../Models/Listing");
const User = require("../../Models/User");
const Costomerror = require("../../Middleware/Costomerror");
const { joilistingschema } = require("../../utils/validation");



const allListing = async (req, res, next) => {
    console.log(req.user.id);
    const allListings = await Listing.find({ host:req.user.id }).populate("host", "username email profileimage") 

    if (!allListings) {
        return next(new Costomerror("no listings find", 404));
    }
    console.log(allListings);
    
    res.status(200).json(allListings);
};

const addlisting = async (req, res, next) => {


    const { value, error } = joilistingschema.validate(req.body);

    if (error) {
        return next(new Costomerror(error));
    }

    const { host, title, description, city, country, price ,category} = value;

    const validHost = await User.findById(host);
    if (!validHost) {
        return next(new Costomerror("Host not found.", 404));
    }
    if (validHost.role === "guest") {
        validHost.role = "host";
        await validHost.save();
    }

    const images = req.files?.map((file) => file.path);

    const newListing = new Listing({
        host,
        title,
        description,
        price,
        images,
        city,
        country,
        category
    });

    const savedlisting = await newListing.save();
    res.status(201).json({
        message: "Listing added successfully!",
        listing: savedlisting,
    });
};

const editlisting = async (req, res, next) => {
    const { _id,images,trending, ...productData } = req.body;

    const { error, value } = joilistingschema.validate(productData);
    if (error) {
        console.log(error);

        return next(new Costomerror("Validation failed", 400));
    }

    if (req?.file) {
        const newImages = req.files.map((file) => file.path);
        Listing.images.push(...newImages);
    }

    const updatedlisting = await Listing.findByIdAndUpdate(req.params.id, value, {
        new: true,
    });
    if (!updatedlisting) {
        return next(new Costomerror("Product not found with this ID", 404));
    }
    res.status(200).json(updatedlisting);
};

const deleteListing=async(req,res,next)=>{
    const deletelisting= await Listing.findByIdAndDelete(req.params.id)
    if(!deletelisting){
        return next(new Costomerror('Product with this ID is not found', 404))
    }
    res.status(200).json("listing deleted succesfully")
}

const viewlistbyid = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next (new Costomerror('Product with this ID is not found', 404))
    } 

    res.status(200).json(listing)
}

module.exports = {
    addlisting,
    editlisting,
    allListing,
    deleteListing,
    viewlistbyid
};
