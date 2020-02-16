const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    //attributes
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now()
    },
    update_date: {
        type: Date,
        required: false
    },
    postedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required: true
    },
    status:{
        type: Boolean
    }
    })
    module.exports = mongoose.model('Posts', PostSchema);