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
image  :{
    type: String,
    required: true,
    
}

// role:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'Roles'
// }
// date: {
//     type: Date,
//     required: Date.now
// }
})
module.exports = mongoose.model('Users',userSchema);