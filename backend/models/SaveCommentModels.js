const mongoose = require('mongoose');

const saveCommentTemplate = new mongoose.Schema({
    idOfVideo:{
        type: String,
        required: true
    },
    dataOfcomment:{
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('allComments', saveCommentTemplate)