const joi =require("joi")

const joiuserschema= joi.object({
    username:joi.string(),
    password:joi.string(),
    email:joi.string().email().required(true),
    role:joi.string().default("guest"),
    profileimage:joi.string()
})

module.exports={joiuserschema}