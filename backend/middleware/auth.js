const jwt =  require('jsonwebtoken')
const {JWT_SECRET} = require('../uitilities/config')
const usermodal = require('../models/user_modal')

const Auth = async(req,res,next) => {

    try{

        const token = req.headers.authorization 
        const user = jwt.verify(token, JWT_SECRET)

        const dbuser = await usermodal.findById({_id: user.id}).select('-password')

        req.fetch = dbuser
        next()


    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false , messege: 'internal server error'})
        
    }
}

module.exports = Auth