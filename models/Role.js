const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
//attributes
roles :{
    type: String
}
})
module.exports = mongoose.model('Roles',RoleSchema);