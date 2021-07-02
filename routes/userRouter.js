const express=require('express')
const router=express.Router()
const { createUser, login, getMe, deleteUser, editUser }=require('../controllers/userController')
router.get('/add', (req,res,next)=>{
    res.render('pages-register',{
        layout:'./layout'
    })
})

router.get('/login',(req,res,next)=>{
    res.render('pages-login',{
        layout:'./layout'
    })
})

router.post('/add', createUser)
router.post('/login', login)
router.get('/getme', getMe)
router.delete('/delete/:id',deleteUser)
router.patch('/edit/:id',editUser)

module.exports=router