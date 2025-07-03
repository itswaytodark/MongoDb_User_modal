const usermodal = require('../models/user_modal')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../uitilities/config') 
const bCrypt = require('bcrypt')
const { sendMail } = require('../uitilities/nodemailer')


const newuser = async(req,res) => {

    try
    {
        const user = req.body
        if(!user)
        {
            return res.status(404).json({status: false , data: {messege: 'NO DATA AVALIBE IN BODY'}})
        }

        const userExist = await usermodal.findOne({name:user.name})
        if(userExist)
        {
            return res.status(409).json({status:true, data:{messege: 'user name Already Exist'}})
        }

        const hashpassword = bCrypt.hashSync(user.password, 6)

        const dbuser = usermodal({
            name: user.name,
            email: user.email,
            password: hashpassword
        })
        await dbuser.save()

        sendMail(user.email,`WELCOME ${user.name} ` , 'WE ARE HAPPY TO HAVE YOU AS USER ' , `<a href='https://www.youtube.com/watch?v=o1BhCIRYnWI&t=1653s'> CLICK TO OPEN VIDEO</a>`)

        return res.status(200).json({status:true, data:{messege: 'User Created Successfully' , users: dbuser}})
    }
    catch(error)
    {
        console.log('Unable to Create user',error);
        return res.status(500).json({status: false , data: {messege: 'Internal server error' , ERROR:error}})
        
    }
}

const getuser = async(req,res) => {
    try{

        const dbuser = await usermodal.find()
        return res.status(200).json({status:true, data:{message:"all data received", users:dbuser}})
    }
    catch(error)
    {
        console.log('Unable to Get User');
        return res.status(500).json({status: false , data: {messege: 'Internal server error' , ERROR:error}})
        
    }

}

const edituser = async(req,res) => {

    try{

        const user = req.body
        const userid = req.params.id

        if(!user && user)
        {
            return res.status(404).json({status:false, data:{message:"NO DATA AVAIBLE"}})
        }

        const dbuser = await usermodal.updateOne({_id:userid}, 
            {
                name: user.name,
                email: user.email,
                password: user.password
            }
        )
        return res.status(200).json({status:true, data:{message:'Update successfully'}})

    }
    catch(error)
    {
        console.log('error editing data' , error);
        return res.status(500).json({status:false, data:{message: "Internal server error" , ERROR: error}})
        
    }
}

const deleteuser = async(req,res) => {
    try{

        userid = req.params.id
        await usermodal.deleteOne({_id: userid})
        return res.status(200).json({status:true, data:{message:'Delete successfully'}})
    }
    catch(error)
    {
        console.log('ERROR deleting data' , error);
        res.status(500).json({status: false , data: {messege: 'Internal server error' , ERROR:error}})

        
    }
}

const login = async(req,res) => {
    try{
        const user = req.body;
        const dbuser = await usermodal.findOne({email:user.email})

        if(!dbuser){
            return res.status(404).json({status:false, data:{message:'Email not found'}})
        }
        
        const match = bCrypt.compareSync(user.password, dbuser.password)
        
        if(match){
            const token = jwt.sign({id:dbuser._id}, JWT_SECRET)
            return res.status(200).json({status:true, data:{message:'login successfylly', data:dbuser , token:token}})
        }
        // remove object
        else{
            return res.status(404).json({status:false, data:{message:'Incorrect password'}})

        }

    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false, data:{message:"Internal server error", data:error}})
    }
}

const Authorization = async(req,res) => {

    return res.status(200).json({status:true , message: 'Auth Successfull', data: req.fetch })

}



module.exports = {newuser,getuser,edituser,deleteuser,login, Authorization}