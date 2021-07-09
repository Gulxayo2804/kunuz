const Category = require('../models/Category');
const News= require('../models/news')

exports.createCategory = async(req,res,next)=>{
    try {
        const category = new Category({
            name:req.body.name
        })
        await category.save()
        .then(()=>{
            res.redirect('/category/all')
        })
        .catch((error)=>{
            res.status(500).redirect('/category/add')
        })
        
    } catch (error) {
        res.status(500).redirect('/category/add')
    }
}

exports.getAll = async(req,res,next)=>{
    try {
        const category = await Category.find()
            .select()
        res.status(200).render('admin/category',{
            data:category,
            layout:'./admin/layout'
        })
        
    } catch (error) {
        res.status(500).redirect('/admin')
    }
}


exports.categoryUpdate=async (req,res,next)=>{
    try {
        const category=await Category.findByIdAndUpdate({_id:req.params.id})
            category.name=req.body.name
        await category.save()
            .then(()=>{
                res.status(200).redirect(`/category/all`)
            })
            .catch((err)=>{
                res.status(200).redirect(`/category/all/${category._id}`)
            })
        
    } catch (error) {
        res.status(500).redirect(`/category/all/${category._id}`)
    }
}

exports.categoryDelete=async(req,res,next)=>{
    try {
        await Category.findByIdAndDelete({_id:req.params.id})
        res.status(200).redirect(`/category/all`)
    } catch (error) {
        res.status(500).redirect('/category/all')
    }
}

exports.getElementById= async (req,res,next)=>{
    try {
        const category= await Category.findById({_id:req.params.id})
        res.status(200).render('admin/edit-category',{
            data:category,
            layout:'./admin/layout'
        })
    } catch (error) {
        res.status(500).redirect('/category/all')
    }
}

exports.getElementByName= async (req,res,next)=>{
    try {
        const category= await Category.find()
        const last= await News.find()
            .sort({createdAt:-1})
        const news= await News.find({categoryID:req.params.categoryID})
                .populate('categoryID',{ name : 1})
        res.status(200).render('page/news',{
            data:{category,news,last},
            layout:'./page/user'
        })
        
    } catch (error) {
        res.status(500).redirect('/')
    }
}
