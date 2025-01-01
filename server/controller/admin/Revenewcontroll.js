const Booking = require("../../Models/Booking")
const CustomError = require("../../Middleware/CustomError")

const getrevenew = async (req, res, next) => {

    const revenue = await Booking.aggregate([
        { $match: { status: "Completed" } },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: { $round: [{ $multiply: ["$totalPrice", 0.2] }, 0] } }
            }
        }
    ])

    if (!revenue) {
        return next(new CustomError("revenew not found", 404))
    }

    res.status(200).json({
        
        success: true,
        adminRevenue: revenue[0]?.totalRevenue || 0
    });

}

module.exports = { getrevenew }