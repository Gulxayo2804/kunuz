const Category = require('../models/Category');
const News= require('../models/news')

exports.createCategory = async(req,res,next)=>{
    const category = new Category({
        name:req.body.name
    })
    await category.save()
    .then(()=>{
        res.redirect('/admin')
    })
    .catch((error)=>{
        res.status(500).redirect('/category/add')
    })
}

exports.getAll = async(req,res,next)=>{
    const category = await Category.find()
        .select({name:1})
    res.status(200).render('admin/category',{
        data:category,
        layout:'./admin/layout'
    })
}

exports.getAlls = async(req,res,next)=>{
    const category = await Category.find()
        .select({name:1})
    res.status(200).render('page/user',{
        data:category,
        layout:'./page/user'
    })
}
exports.categoryUpdate=async (req,res,next)=>{
    const category=await Category.findByIdAndUpdate({_id:req.params.id})
        category.name=req.body.name
    await category.save()
        .then(()=>{
            res.status(200).redirect(`/category/all`)
        })
        .catch((err)=>{
            res.status(200).redirect(`/category/all/${category._id}`)
        })
}

exports.categoryDelete=async(req,res,next)=>{
    await Category.findByIdAndDelete({_id:req.params.id})
    res.status(200).redirect(`/category/all`)
}

exports.getElementById= async (req,res,next)=>{
    const category= await Category.findById({_id:req.params.id})
    res.status(200).render('admin/edit-category',{
        data:category,
        layout:'./admin/layout'
    })
}
exports.getElementByName= async (req,res,next)=>{
    const category= await Category.find()
    const news= await News.find()
        .populate({
            path:'categoryID',
        })
    const categories=await Category.findOne({name:req.params.name})
    res.status(200).render('page/news',{
        data:{category, categories, news},
        layout:'./page/user'
    })
}
