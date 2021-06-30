const router = require('express').Router();
const {createCategory,
    getAll} = require('../controllers/categoryController');

    router.post('/Add',createCategory);
    router.get('/All',getAll);

    module.exports = router;