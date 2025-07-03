const mongoose = require('mongoose')

const userScema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    }

})

module.exports = mongoose.model('user' , userScema)