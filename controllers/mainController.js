const News=require('../models/news')
const User=require('../models/User')
const Category=require('../models/Category')

exports.getall=async (req,res,next)=>{
    const news= await News.find()
        .limit(15)
    const last=await News.find()
        .limit(5)
        .sort({date:-1})
    const category= await Category.find()
    res.status(200).render('page/kun',{
        data:{news,category,last},
        layout:'./page/user'
    })
}