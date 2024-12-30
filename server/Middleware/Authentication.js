const jwt= require("jsonwebtoken")
const CustomError= require("./CustomError")
const user = require("../Models/User")

const userAuthMiddleware = async(req, res, next) => {
    
    const authHeader = req.headers["authorization"];
  
    const token = authHeader?.split(" ")[1];
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const mongouser= await user.findOne({username:decoded.name})
       
        req.user = mongouser;
        next();

    } catch (error) {
        return next(new CustomError("Invalid or expired token", 401));
    }
};

const hostAuth = (req, res, next) => {
    userAuthMiddleware(req, res, () => {
        if (req.user?.role === "host") {
            return next();
        }
        return next(new CustomError("You are not a host", 403));
    });
};


const adminAuth = (req, res, next) => {
    userAuthMiddleware(req, res, () => {
        if (req.user?.admin) {
            return next()
        }
        return next(new CustomError("You are not authorized", 403));
    });
};

module.exports= { userAuthMiddleware, hostAuth, adminAuth };
