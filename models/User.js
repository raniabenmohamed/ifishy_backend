const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    username: {
        type: String
    },
    
    email: {
        type: String
    },
    password: {
        type: String
    },
    adresse: {
        type: String
    },
    phone: {
        type: String
    },
    isVerified: { type: Boolean },
    
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User