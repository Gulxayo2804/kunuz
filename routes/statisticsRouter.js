const router=require('express').Router()
const {protect}=require('../middleware/auth')
const {admin, superAdmin}= require('../middleware/admin')
const {userNumber}=require('../controllers/statistics')

router.get('/', userNumber)
module.exports=router