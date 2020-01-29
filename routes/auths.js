const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../validation');
const {loginValidation} = require('../validation');


router.post('/register', async (req, res) => {

  //LESTS VALIDATE THE DATA BEFORE WE A USER
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


  // Checking if the user is already in the database
      const emailExits = await User.findOne({email: req.body.email});
      if(emailExits) return res.status(400).send('Email is already exits');
  
  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a user
  const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      image: req.body.image
  }); 
  try{
         const savedUser = await user.save()
          res.send(savedUser);
  }catch(err){
      res.status(400).send(err);
      }

    });


  //LOGIN
  router.post('/login', async (req, res) => {

    //LESTS VALIDATE THE DATA BEFORE WE A USER
      const { error } = loginValidation(req.body);
      if(error) return res.status(400).send(error.details[0].message);
  
     // Checking if the emailexits
      const user = await User.findOne({email: req.body.email});
      if(!user) return res.status(400).send('Email is wrong');
 

      //Passsword is correct
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send('invalid password');
    });
  
  module.exports = router;