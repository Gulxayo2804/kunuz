const express=require('express')
const router=express.Router()
const {protect,}=require('../middleware/auth')
const { superAdmin, admin}=require('../middleware/admin')
const {createNews, getAll, getNewsById, newsByDate,newsUpdate,deleteNews}=require('../controllers/newController')

router.post('/add',admin, createNews)
router.patch('/edit/:id', admin,newsUpdate)
router.get('/all', getAll)
router.get('/all/:id',getNewsById)
router.get('/last', newsByDate)
router.delete('/delete/:id', superAdmin, deleteNews)

module.exports=router