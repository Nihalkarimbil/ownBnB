const jwt= require("jsonwebtoken")
const customError= require("../Middleware/Costomerror")


const userAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new customError("Invalid or expired token", 401));
    }
};

const hostAuth = (req, res, next) => {
    userAuthMiddleware(req, res, () => {
        if (req.user?.role === "host") {
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
