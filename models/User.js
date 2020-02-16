const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
//attributes
username :{
    type: String,
    required: true,
    min: 6
},
email  :{
    type: String,
    required: true,
    min:10
},
password  :{
    type: String,
    required: true,
    min:8
},
mobile_number  :{
    type: String,
    required: true,
    max:10
},
temporary_addreess  :{
    type: String,
},
permanent_address :{
    type: String,
},
image  :{
    type: String    
},
create_date: {
    type: Date,
    default: Date.now()
},
update_date: {
    type: Date,
    required: false
},
role:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Roles'
}
})
module.exports = mongoose.model('Users',userSchema);