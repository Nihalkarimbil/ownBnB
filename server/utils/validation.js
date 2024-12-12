const joi = require("joi");


const joiuserschema = joi.object({
  username: joi.string(),
  password: joi.string(),
  email: joi.string().email().required(),
  role: joi.string().default("guest"),
  profileimage: joi.string(),
});

const joilistingschema = joi.object({
  host: joi.string(),
  title: joi.string().required(),
  description: joi.string().required(),
  city: joi.string().required(),
  country: joi.string().required(),
  price: joi.string().required(),
  images: joi.array().items(joi.string().required()),
  rating: joi.string(),
  Trending:joi.boolean(),
  category:joi.string().required()
});

module.exports = {
  joiuserschema,
  joilistingschema,
};
