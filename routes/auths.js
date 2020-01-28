const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req,res) => {
  const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image
  }); 
  try{
         const savedUser = await user.save()
          res.send(savedUser);
  }catch(err){
      res.status(400).send(err)
  }

});
  module.exports = router;