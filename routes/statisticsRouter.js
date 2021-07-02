const router=require('express').Router()
const {userNumber}=require('../controllers/statistics')

router.get('/', userNumber)

module.exports=router