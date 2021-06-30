const express=require('express')
const router=express.Router()
const { getAll, getNewsById, newsByDate, creatUser }=require('../controllers/newController')

router.get('/all', getAll)
router.get('/all/:id',getNewsById)
router.get('/last', newsByDate)

module.exports=router