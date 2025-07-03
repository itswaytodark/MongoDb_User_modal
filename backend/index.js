const express =  require('express')
const cors =  require('cors')
const connect = require('./uitilities/connectDb')
const router = require('./routes/user_routes')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api' , router)


const startServer = async() => {
    try{

        await connect()
        app.listen(5000, (req,res) => {
            console.log('Server is running on port 5000');
            
        })

    }
    catch(error)
    {
        console.log('Failed to start server ', error);
        
        
    }
}

startServer()