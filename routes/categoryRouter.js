const router = require('express').Router();
const {createCategory, categoryUpdate,
    getAll, getElementById, categoryDelete,getAlls,getElementByCategoryId, getElementByName} = require('../controllers/categoryController');

router.get('/add', (req,res)=>{
    res.render('admin/category-page',{
        layout:'./admin/layout'
    })
})

router.get('/all/:id', getElementById)
router.get('/alls/:categoryID', getElementByName)
router.post('/add',createCategory);
router.get('/all',getAll);
router.patch('/edit/:id',categoryUpdate)
router.delete('/delete/:id', categoryDelete)

module.exports = router;