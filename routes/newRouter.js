const express=require('express')
const Category= require('../models/Category')
const router=express.Router()
const {isAuth}= require('../middleware/auth')
const { superAdmin, admin}=require('../middleware/admin')
const md5=require('md5')
const multer=require('multer')
const path=require('path')
const {createNews, getAll, getNewsByTitle, getNewsById, addNews, newsByDate,newsUpdate,deleteNews}=require('../controllers/newController')

const storage=multer.diskStorage({
    limits:{
        fileSize: 1024*1024
    },
    filefilter:(req,file, cb, err)=>{
        var file= req.file.filename
        var error_msg= error  instanceof multer.MulterError;
        if(file===undefined){
            req.fileValidationError= "Not file";
            return cb(null, false, req.fileValidationError)
        }
        if(error_msg){
            req.fileSizeError="image more than"
            return cb(null, false, req.fileSizeError)
        } 
        cb(null, true)
    },
    destination: (req, file, cb)=>{
        cb(null, './public/uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
})

const upload= multer({storage:storage})

router.get('/add',isAuth, async (req,res, next)=>{
    const category= await Category.find()
    res.render('admin/news-page', {
        data:category,
        layout:'./admin/layout'
    })
})
router.post('/add', upload.single('image'), isAuth, createNews)
router.patch('/edit/:id',upload.single('image'),isAuth, newsUpdate)
router.get('/all', isAuth,getAll)
router.get('/all/:id',isAuth,getNewsById)
router.get('/alls/:id', getNewsByTitle)
router.delete('/delete/:id',isAuth,  deleteNews)

module.exports=router