const express = require('express')
const router = express.Router()

const {newuser,getuser,edituser, deleteuser, login, Authorization} = require('../controllers/user_controller')
const Auth = require('../middleware/auth')

router.post('/newuser', newuser)
router.get('/getuser' , getuser)
router.put('/edituser/:id' , edituser)
router.delete('/deleteuser/:id' , deleteuser)
router.post('/login', login)
router.post('/auth', Auth , Authorization)
module.exports = router;