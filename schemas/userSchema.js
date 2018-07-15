const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    username: {
        type: String,
        required:[true,'User Name field can not be empty']

    },
    password: {
        type: String,
        required:[true,'Password field can not be empty']
    }
})
const User = mongoose.model('user',UserSchema)

module.exports = User