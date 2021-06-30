const Category = require('../models/Category');

exports.createCategory = async(req,res,next)=>{
    const category = new Category({
        name:req.body.name
    })
    await category.save()
    .then(()=>{
        res.status(201).json({
            success:true,
            data:category
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            data:error
        })
    })
}

exports.getAll = async(req,res,next)=>{
    const category = await Category
    .find()
    res.render('category',{
        category:category
        //layout:'./layout'
    })
}