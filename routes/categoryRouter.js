const router = require('express').Router();
const {createCategory, categoryUpdate,
    getAll, categoryDelete} = require('../controllers/categoryController');

router.get('/add', (req,res)=>{
    res.render('category-page',{
        layout:'./layout'
    })
})

router.get('/edit', (req,res)=>{
    res.render('edit-category',{
        layout:'./layout'
    })
})


router.post('/add',createCategory);
router.get('/all',getAll);
router.patch('/edit/:id',categoryUpdate)
router.delete('/delete/:id', categoryDelete)

module.exports = router;