const express = require('express')
const router = express.Router()

const {newuser,getuser,edituser, deleteuser, login} = require('../controllers/user_controller')

router.post('/newuser', newuser)
router.get('/getuser' , getuser)
router.put('/edituser/:id' , edituser)
router.delete('/deleteuser/:id' , deleteuser)
router.post('/login', login)
module.exports = router;