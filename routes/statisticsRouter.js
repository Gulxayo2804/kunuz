const router=require('express').Router()
const {isAuth}= require('../middleware/auth')
const {userNumber}=require('../controllers/statistics')

router.get('/', isAuth, userNumber)
module.exports=router