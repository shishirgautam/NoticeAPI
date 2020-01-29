const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
//attributes
username :{
    type: String,
    required: true
},
password  :{
    type: String,
    required: true
}
})
module.exports = mongoose.model('Roles',RoleSchema);