const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validation');



router.post('/register', async (req, res) => {

  //LESTS VALIDATE THE DATA BEFORE WE A USER
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


  // Checking if the user is already in the database
      const usernameExits = await User.findOne({username: req.body.username});
      if(usernameExits) return res.status(400).send('username is already exits');
  
  //Hash passwords

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a user
  const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      image: req.body.image,
      mobile_number: req.body.mobile_number,
      temporary_addreess: req.body.temporary_addreess,
      permanent_address: req.body.permanent_address,
      update_date: req.body.update_date,
      role: req.body.role || "5e36505b45195141549ca35b"
  }); 
  try{
         const savedUser = await user.save()
          res.send({user: user._id });
  }catch(err){
      res.status(401).send(err);
      }

    });


  //LOGIN
  router.post('/login', async (req, res) => {

    //LESTS VALIDATE THE DATA BEFORE WE A USER
      const { error } = loginValidation(req.body);
      if(error) return res.status(400).send(error.details[0].message);
  
     // Checking if the emailexits
      const user = await User.findOne({username: req.body.username  });
      if(!user) return res.status(400).send('username is not found');


      //Passsword is correct
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if(!validPass)  return res.status(400).send('invalid password')

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.SECRET);
    res.send({
        "_id": user._id,
        "username": user.username,
        "email": user.email,
        "image": user.image,
        "mobile_number": user.mobile_number,
        "role": user.role,
        "temporary_address": user.temporary_addreess,
        "permanent_address": user.permanent_address,
        "token": token
    })
   
    // res.header('auth-token', token).send(response);
    });

      router.get('/me', require("./verifyToken"), async (req, res) => {
  
     // Checking if the emailexits
      const user = await User.findOne({_id : req.user._id  });
      if(!user) return res.status(400).send('username is not found');
    res.send({
        "_id": user._id,
        "username": user.username,
        "email": user.email,
        "image": user.image,
        "mobile_number": user.mobile_number,
        "role": user.role,
        "temporary_address": user.temporary_address,
        "permanent_address": user.permanent_address
    })
    });
  module.exports = router;