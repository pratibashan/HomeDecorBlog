const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema ({
    name: {
        type: String
    },
    email: {
        type: String
    },
    comment: {
        type: String
    },
    posted_at :{
        type: Date,
        default:Date.now()
    },
    postId : {
        type: mongoose.Schema.ObjectId
    },
    userId : {
        type: mongoose.Schema.ObjectId
    }    
})
const PostComment = mongoose.model('comment',CommentSchema)

module.exports = PostComment