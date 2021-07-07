const express=require('express')
const router=express.Router()
const { createUser, login, getMe, deleteUser, editUser, getAll, getElementById }=require('../controllers/userController')

router.get('/add', (req,res,next)=>{
    res.render('user-page',{
        layout:'./admin/layout'
    })
})


router.get('/login',(req,res,next)=>{
    res.render('admin/pages-login',{
        layout:'./admin/layout'
    })
})

// router.get('/all', getAll)
router.post('/add', createUser)
router.get('/:id', getElementById)
router.post('/login', login)
router.get('/getme', getMe)
router.delete('/delete/:id',deleteUser)
router.patch('/edit/:id',editUser)

module.exports=router