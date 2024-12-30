const Booking = require("../../Models/Booking")
const CustomError = require("../../Middleware/CustomError")


const getreservation = async (req, res, next) => {

    const booking = await Booking.find({ host: req.params.id }).populate("guest").populate("listing")
    if (!booking) {
        return next(new CustomError("no booking found for this host", 400))
    }

    res.status(200).json(booking)
}

const updatestatus = async (req, res, next) => {

    const { bookingId, newstatus } = req.body;

    if (!bookingId || !newstatus) {
        return next(new CustomError("Missing required fields", 400));
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { status: newstatus },
        { new: true }
    );

    if (!updatedBooking) {
        return next(new CustomError("Booking not found", 404));
    }

    res.status(200).json({ message: "Booking status updated", booking: updatedBooking });

};

const getRevenew= async(req,res,next)=>{
    const booking =await Booking.find({host :req.params.id})
    const Completed= booking.filter(book=>book.status==="Completed")
    
    if(!booking){
        return next (new CustomError("no booing found for this host",400))
    }
    let revenew= 0
    Completed.forEach(book=>{
        revenew+=book.totalPrice
    })
    res.status(200).json({revenew})

}



module.exports = {
    getreservation,
    updatestatus,
    getRevenew
}