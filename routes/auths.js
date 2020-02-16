const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

//GET BACK ALL THE REGISTER
router.get('/', async (req,res) => {
  try{
      var query = { status: true };
      const users = await User.find();
      res.json(users);
  }catch(err){
      res.json({messag:err});
  }
});

router.get("/me", require("./verifyToken"),(req,res)=>{
    // res.send({User: req.user,
    //   username: req.username
    // });
    User.findById({_id: req.user._id})
    .populate("role")
    .exec().then((user)=>{
      res.send(user);
    }).catch((error)=>{
      res.status(400).send(error)
    });
  
});


router.post('/register', async (req, res) => {

  //LESTS VALIDATE THE DATA BEFORE WE A USER
  const { error } = registerValidation(req.body);
  console.log(req.body)
  if (error) return res.status(400).send(error.details[0].message);


  // Checking if the user is already in the database
  const usernameExits = await User.findOne({ username: req.body.username });
  if (usernameExits) return res.status(400).send('username is already exits');

  //Hash passwords

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    // image: req.body.image,
    mobile_number: req.body.mobile_number,
    temporary_address: req.body.temporary_address,
    permanent_address: req.body.permanent_address,
    update_date: req.body.update_date,
    role: 'User'
  });
  try {
    const savedUser = await user.save()
    res.send({ user: user._id });
  } catch (err) {
    // console.log(err)
    res.status(400).send(err);
  }

});

//LOGIN
router.post('/login', async (req, res) => {

  //LESTS VALIDATE THE DATA BEFORE WE A USER
  // const { error } = loginValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
console.log(req.body)
  // Checking if the emailexits
  var user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('username is not found');

  try {
    //Passsword is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('invalid password')

    //Create and assign a token
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET);
    // res.header('auth-token', token).send([user, { token }]);

    // res.send('Logged in');  
    res.json({ message: "Logged in", result: user, token: token })
  } catch (error) {
    console.log(error.message);
  }

});
module.exports = router;