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
             .required() 
             .email(),
        password: Joi.string() 
                .min(6) 
                .required() ,
        image: Joi.string() 
             .min(6) 
             .required()

   });
   return  Joi.validate(data, schema);
  
};
const loginValidation = data =>{
    const schema = Joi.object({ 
       
        email: Joi.string() 
             .min(6) 
             .required() 
             .email(),
        password: Joi.string() 
                .min(6) 
                .required() 
       
   });
   
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;