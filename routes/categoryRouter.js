const router = require('express').Router();
const {createCategory, categoryUpdate,
    getAll, getElementById, categoryDelete,getAlls, getElementByName} = require('../controllers/categoryController');

router.get('/add', (req,res)=>{
    res.render('category-page',{
        layout:'./layout'
    })
})
router.get('/all/:id', getElementById)
router.get('/alls/:name', getElementByName)
router.post('/add',createCategory);
router.get('/all',getAll);
router.get('/alls',getAlls);
router.patch('/edit/:id',categoryUpdate)
router.delete('/delete/:id', categoryDelete)

module.exports = router;