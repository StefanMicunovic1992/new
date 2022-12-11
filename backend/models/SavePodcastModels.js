const mongoose = require('mongoose');

const savePodcastTemplate = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    chanelId:{
        type: String,
        required: true
    },
    playListId:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('allPodcast', savePodcastTemplate)