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
        temporary_address: Joi.string(),
        permanent_address: Joi.string(),
        role: Joi.string()

   });
   return  Joi.validate(data, schema);
  
};
const loginValidation = data =>{
    const schema = Joi.object({ 
       
        username: Joi.string() 
             .min(6) 
             .required(),
        password: Joi.string() 
                .min(6) 
                .required() 
       
   });
   return  Joi.validate(data, schema);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;