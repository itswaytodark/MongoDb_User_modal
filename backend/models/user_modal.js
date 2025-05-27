const mongoose = require('mongoose')

const userScema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    password: {
        type: String
    }

})

module.exports = mongoose.model('user' , userScema)