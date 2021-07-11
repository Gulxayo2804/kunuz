const router = require('express').Router();
const {isAuth}= require('../middleware/auth')
const {createCategory, categoryUpdate,
    getAll, getElementById, categoryDelete,getAlls,getElementByCategoryId, getElementByName} = require('../controllers/categoryController');

router.get('/add',isAuth, (req,res)=>{
    res.render('admin/category-page',{
        layout:'./admin/layout'
    })
})

router.get('/all/:id',isAuth, getElementById)
router.get('/alls/:categoryID', getElementByName)
router.post('/add',isAuth,createCategory);
router.get('/all',isAuth,getAll);
router.patch('/edit/:id',isAuth,categoryUpdate)
router.delete('/delete/:id',isAuth, categoryDelete)

module.exports = router;