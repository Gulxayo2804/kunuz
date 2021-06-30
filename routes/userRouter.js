const express=require('express')
const router=express.Router()
const { createUser, login, getMe, deleteUser, editUser }=require('../controllers/userController')

router.post('/add', createUser)
router.post('/login', login)
router.get('/getme', getMe)
router.delete('/delet/:id',deleteUser)
router.patch('/edit/:id',editUser)

module.exports=router