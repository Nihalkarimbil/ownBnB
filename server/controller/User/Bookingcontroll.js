const Booking = require("../../Models/Booking");
const customerror = require("../../Middleware/Costomerror");
const Listing = require("../../Models/Listing");
const stripe = require("stripe");



const addbooking = async (req, res, next) => {

    const { listing, guestCount, checkIn, checkOut, totalPrice } = req.body;

    const list = await Listing.findById(listing);
    if (!list) {
        return next(customerror("Listing not found", 404));
    }

    const lineItems = [
        {
            price_data: {
                currency: "INR",
                product_data: {
                    name: list.title,
                    images: [list.images[0]],
                   
                },
                unit_amount: Math.round(totalPrice * 100),
            },
            quantity: guestCount,
        },
    ];

    const Stripeclient = stripe(process.env.STRIPE_KEY);
    const session = await Stripeclient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        ui_mode: "embedded",
        return_url: `${process.env.URL_FRONTEND}payment-success/{CHECKOUT_SESSION_ID}`,
    });

    const Newbooking = new Booking({
        guest: req.user.id,
        listing: listing,
        checkIn,
        checkOut,
        sessionId: session.id,
        totalPrice,
        guestCount,
    });

    await Newbooking.save();

    res.status(201).json({
        success: true,
        message: "Booking initiated",
        data: Newbooking,
        clientsecret: session.client_secret,
        linedata: lineItems,
    });


};

const sessiondetails = async (req, res, next) => {
    const { sessionId } = req.params;

    const Stripeclient = new stripe(process.env.STRIPE_KEY);
    const session = await Stripeclient.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
    });

    const lineItems = session.line_items.data.map(item => ({
        name: item.description,
        amount: item.amount_total / 100,
        quantity: item.quantity,

    }));
    console.log(lineItems.name);

    res.status(200).json({
        success: true,
        sessionId: session.id,
        data: {
            ...session,
            line_items: lineItems,
        },
    });
};

const getbooking= async(req,res,next)=>{
    const {sessionId}=req.params
    const Bookingc= await Booking.find({sessionId:sessionId}).populate("listing")
    if(!Bookingc){
        return next(new customerror("no booking found",400))
    }
    res.status(200).json(Bookingc)
}

const getuserbooking=async (req,res,next)=>{
    
    const bookings= await Booking.find({guest:req.user._id}).populate("listing")
    if(!bookings){
        return next(new customerror("no bookings found for this guest"))
    }
    res.status(200).json(bookings)
}
const getOnebooking= async(req,res,next)=>{
    const booking= await Booking.findById(req.params.id).populate("listing")
    if(!booking){
        return next(new customerror("no booking found with this ID"))
    }
    res.status(200).json(booking)
}

module.exports = { addbooking, sessiondetails,getbooking,getuserbooking,getOnebooking }
