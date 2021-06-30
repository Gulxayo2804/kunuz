const router = require('express').Router();
const {createCategory, categoryUpdate,
    getAll, categoryDelete} = require('../controllers/categoryController');

    router.post('/add',createCategory);
    router.get('/all',getAll);
    router.patch('/edit/:id',categoryUpdate)
    router.delete('/delete/:id', categoryDelete)

    module.exports = router;