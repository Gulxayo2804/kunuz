const express=require('express')
const router=express.Router()
const {isAuth}= require('../middleware/auth')
const { createUser, login, getMe, deleteUser, 
    editUser, getAll, getElementById }=require('../controllers/userController')

router.get('/add', (req,res,next)=>{
    res.render('admin/user-page',{
        layout:'./admin/layout'
    })
})


router.get('/login',(req,res,next)=>{
    res.render('admin/pages-login',{
        layout:'./admin/login'
    })
})

router.post('/add',isAuth, createUser)
router.get('/:id',isAuth, getElementById)
router.post('/login', login)
router.get('/getme', getMe)
router.delete('/delete/:id',isAuth, deleteUser)
router.patch('/edit/:id',isAuth, editUser)

module.exports=router