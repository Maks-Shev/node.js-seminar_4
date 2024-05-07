const joi = require('joi');

const productScheme = joi.object({
    name: joi.string().min(1).required(),
    price: joi.number().min(1).required(),
    description: joi.string().min(10).required(),
    category: joi.string().min(1).required(),
    color: joi.string().min(1).required() 
});


const idScheme = joi.object({
    id: joi.number().required(),
});

module.exports = { productScheme, idScheme };



// const { checkBody, checkParams } = require('./validation/validator');
// const { productScheme, idScheme} = require('./validation/scheme');