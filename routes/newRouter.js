const express=require('express')
const router=express.Router()
const {createNews, getAll, getNewsById, newsByDate,newsUpdate,deleteNews}=require('../controllers/newController')

router.post('/add', createNews)
router.patch('/edit/:id', newsUpdate)
router.get('/all', getAll)
router.get('/all/:id',getNewsById)
router.get('/last', newsByDate)
router.delete('/delete/:id', deleteNews)

module.exports=router