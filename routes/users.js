var express = require('express');
var router = express.Router();
const User = require('../models/User')

/* GET users listing. */
// router.get('/a', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/',(req, res) => {
    console.log(req.body);
  });

module.exports = router;