const jwt= require("jsonwebtoken")
const customError= require("../Middleware/Costomerror")
const user = require("../Models/User")

const userAuthMiddleware = async(req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const mongouser= await user.findOne({username:decoded.name})
        console.log(mongouser);
        
        req.user = mongouser;
        console.log(req.user);
        
        next();
    } catch (error) {
        return next(new customError("Invalid or expired token", 401));
    }
};

const hostAuth = (req, res, next) => {
    userAuthMiddleware(req, res, () => {
        console.log("User role:", req.user.role);
        if (req.user.role === "host") {
            return next();
        }
        return next(new customError("You are not a host", 403));
    });
};


const adminAuth = (req, res, next) => {
    userAuthMiddleware(req, res, () => {
        if (req.user?.admin) {
            return next();
        }
        return next(new customError("You are not authorized", 403));
    });
};

module.exports= { userAuthMiddleware, hostAuth, adminAuth };
