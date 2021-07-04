const Category = require('../models/Category');

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
    res.status(200).json({
        success:true,
        data:category
    })
}

exports.categoryUpdate=async (req,res,next)=>{
    const category=await Category.findByIdAndUpdate({_id:req.params.id})
        category.name=req.body.name
    await category.save((err,data)=>{
        if(err) throw err;
        res.status(200).json({
            success:true,
            data:data
        })
    })
}

exports.categoryDelete=async(req,res,next)=>{
    await Category.findByIdAndDelete({_id:req.params.id})
    res.status(200).send("Malumot o'chirildi")
}