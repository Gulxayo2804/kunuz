const express=require('express')
const router=express.Router()
const {protect,}=require('../middleware/auth')
const { superAdmin, admin}=require('../middleware/admin')
const {createNews, getAll, getNewsById, newsByDate,newsUpdate,deleteNews}=require('../controllers/newController')

router.get('/add', (req,res)=>{
    res.render('news-page', {
        layout:'./layout'
    })
})


router.post('/add', createNews)
router.patch('/edit/:id',newsUpdate)
router.get('/all', getAll)
router.get('/all/:id',getNewsById)
router.get('/last', newsByDate)
router.delete('/delete/:id', superAdmin, deleteNews)

module.exports=router