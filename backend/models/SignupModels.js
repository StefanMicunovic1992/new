const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    administrator:{
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('allUsers', signUpTemplate)