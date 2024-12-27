const Booking= require("../../Models/Booking")
const customerror= require("../../Middleware/Costomerror")


const getreservation= async(req,res,next)=>{

    const booking= await Booking.find({host:req.params.id}).populate("guest").populate("listing")
    if(!booking){
        return next(new customerror("no booking found for this host",400))
    }

    res.status(200).json(booking)
} 

const updatestatus= async(req,res,next)=>{
    const {bookingId,newStatus}= req.body
    const updatedBooking= await Booking.findByIdAndUpdate(bookingId,
        {status:newStatus},
        {new:true}
    )
    if (!updatedBooking){
        return next(new customerror("booking not  found",404))
    }

    res.status(200).json({ message: "Booking status updated", booking: updatedBooking })
}


module.exports={
    getreservation,
    updatestatus
}