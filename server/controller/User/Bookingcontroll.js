const Booking = require("../../Models/Booking");
const customerror = require("../../Middleware/Costomerror");
const Listing = require("../../Models/Listing");
const stripe = require("stripe");

const addbooking = async (req, res, next) => {
    console.log("rrrre",req);
    console.log("aa",req.user);
    

    const {  listing, guestCount, checkIn, checkOut, totalPrice } = req.body;

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
            quantity: 1,
        },
    ];


    const Stripeclient = new stripe(process.env.STRIPE_KEY)
    const session = await Stripeclient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        ui_mode: "embedded",
        return_url: `${process.env.URL_FRONTEND}/payment-success/{CHECKOUT_SESSION_ID}`
    })

    const Newbooking = new Booking({
        guest: req.user.id,
        listing: listing,
        checkIn,
        checkOut,
        sessionId: session.id,
        totalPrice,
        guestCount
    })

    await Newbooking.save()

    res.status(201).json({
        succes: true,
        message: "booking initiated",
        data: Newbooking,
        clientsecret: session.client_secret,
        linedata: lineItems

    })
};


module.exports = { addbooking }
