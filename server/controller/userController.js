const User = require("../Models/User")
const { joiuserschema } = require("../utils/validation")
const CustomError = require("../Middleware/CustomError")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

const generateAccessToken = (payload) => {
    return JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const generateRefreshToken = (payload) => {
    return JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const userRegistration = async (req, res, next) => {

    const { value, error } = joiuserschema.validate(req.body)

    if (error) {
        return next(new CustomError(error))
    }
    const { username, email, password } = value

    const hashpassword = await bcrypt.hash(password, 5)
    const newUser = new User({ username, email, password: hashpassword })
    await newUser.save()
    console.log(newUser);
    
    const token = JWT.sign(
        { id: newUser._id, email: newUser.email, name: newUser.username ,role:newUser.role},
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    console.log(token);
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    

    
    res.status(200).json({ status: 'succes', message: 'Registerd succesfully',
        token,
        data: {
            id: newUser._id,
            email: newUser.email,
            username: newUser.username,
            role: newUser.role,
            image: newUser.profileimage,
        }
    })
}

const userLogin = async (req, res, next) => {

    const { value, error } = joiuserschema.validate(req.body);

    if (error) {
        return next(new CustomError(error.details[0].message));
    }

    const { email, password } = value;
    const user = await User.findOne({ email });

    const validpass = await bcrypt.compare(password, user.password);
    if (!validpass) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.admin===true) {
        const token = JWT.sign({ id: user._id,admin: true },
            process.env.JWT_SECRET, { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            data: {
                id: user._id,
                email: user.email,
                admin:true,
                username: user.username,
                image: user.profileimage,
                token:token
            },
        })
    }else if (user) {
        const token = JWT.sign(
            { id: user._id, email: user.email, name: user.username ,role:user.role},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
    
        res.status(200).json({
            message: "Login successful",
            token,
            data: {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                image: user.profileimage,
            },
        });
    }

    if (!user) {
        return res.status(404).json({ message: "No user found with this email" });
    }

};

const userProfileupdate = async (req, res, next) => {
    const imageurl = req.file?.path


    const updateduser = await User.findOneAndUpdate(req.user._id, { profileimage: imageurl }, { new: true })
    if (!updateduser) {
        return next(new CustomError("no user find with this id", 404))
    }


    res.status(200).json(updateduser)
}


const activeuser = async (req, res, next) => {

    const user = await User.findById(req.user.id)
    if (!user) {
        return next(new CustomError("no user found"))
    }
    res.status(200).json(user)
}

const hostdtls = async (req, res, next) => {

    const host = await User.findById(req.params.id)
    if (!host) {
        return next(new CustomError("host with this id is not available", 404))
    }
    res.status(200).json(host)
}



module.exports = {
    userRegistration,
    userLogin,
    userProfileupdate,
    activeuser,
    hostdtls
}