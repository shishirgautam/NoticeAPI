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
    }
    // date: {
    //     type: Date,
    //     required: Date.now
    // }
    })
    module.exports = mongoose.model('Posts', PostSchema);