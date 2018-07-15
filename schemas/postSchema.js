
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required:[true,'Title field is required']
    },
    posted_at: {
        type: Date,
        default: Date.now()
    },
    imageURL: {
        type: String
    },
    content: {
        type: String,
        required:[true,'Content field is required']   
    },
    userId : {
        type: mongoose.Schema.ObjectId
    }    
})
const Post = mongoose.model('post',PostSchema)

module.exports = Post


