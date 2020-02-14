//VALIDATION
var Joi = require('joi');

//Register Validation
const registerValidation = data =>{
    const schema = Joi.object({ 
        username: Joi.string() 
                .min(6) 
                .required(),
        email: Joi.string() 
             .min(6) 
             .email(),
        password: Joi.string() 
                .min(6) 
                .required() ,
        image: Joi.string() 
             .required(false),
        mobile_number: Joi.string()
        .required(),
        temporary_address: Joi.string()
        .required(),
        permanent_address: Joi.string()
        .required(),
        role: Joi.string()

   });
   return  Joi.validate(data, schema);
  
};
const loginValidation = data =>{
    const schema = Joi.object({ 
       
        username: Joi.string() 
             .required(),
        password: Joi.string() 
                .required() 
       
   });
   return  Joi.validate(data, schema);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;