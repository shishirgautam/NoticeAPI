const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    //attributes
    comments: {
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    },
    create_date: {
        type: Date,
        default: Date.now()
    },
    update_date: {
        type: Date,
        required: false
    },
    status:{
        type: Boolean
    }
    })
    module.exports = mongoose.model('Comments', CommentSchema);