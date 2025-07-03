const {MONGODB_URL} = require('./config')
const mongoose = require('mongoose')
const userModel = require('../models/user_modal')

const connectDatabase = async() => {
    try{

        await mongoose.connect(MONGODB_URL)
        console.log('DataBase is Connected successfully');
        

    }
    catch(error)
    {
        if(error.name === 'MongooseServerSelectionError'){
            console.log('Please check your server is start or not.')
        }
        console.log('Unable to connect to DataBase', error);
        
    }
}

module.exports = connectDatabase;