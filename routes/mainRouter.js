const router=require('express').Router()
const {getall}= require('../controllers/mainController')

router.get('/',getall)

module.exports=router