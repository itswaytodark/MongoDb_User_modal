const usermodal = require('../models/user_modal')

const newuser = async(req,res) => {

    try
    {
        const user = req.body
        if(!user)
        {
            return res.status(404).json({status: false , data: {messege: 'NO DATA AVALIBE IN BODY'}})
        }

        const dbuser = usermodal({
            name: user.name,
            age: user.age,
            password: user.password
        })

        await dbuser.save()
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
                age: user.age,
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


// Hello User

module.exports = {newuser,getuser,edituser,deleteuser}