const Joi = require('joi');
const Listing = require('./models/listing');


module.exports. listingSchema = Joi.object({

    Listing:Joi.object({
    title: Joi.string().required(),
    description:Joi.string().required(),
    image:Joi.string(),
    price:Joi.number().required(),
    country:Joi.string().required(),
    location:Joi.string().required()
}).required()
})