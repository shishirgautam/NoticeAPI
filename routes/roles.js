var express = require('express');
var router = express.Router();
const Role = require('../models/Role')

//GET BACK ALL THE Users
router.get('/', async (req,res) => {
  try{
      const roles = await Role.find();
      res.json(roles);

  }catch(err){
      res.json({messag:err});
  }

});

/* GET users listing. */
// router.get('/a', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/',async(req, res) => {
    const role = new Role({
      roles: req.body.roles,
    });
    try{
      const savedRole = await role.save()
      res.json(savedRole);
      }catch(err){
          res.json({message: err});
      }
      
  });

module.exports = router;