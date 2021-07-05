const User=require('../models/User')
const New=require('../models/news')
const Category=require('../models/Category')

exports.userNumber=async (req,res,next)=>{
    const user=await User.find()
        .countDocuments()
    const users=await User.find({role:'admin'})
    const news=await New.find()
        .countDocuments()
    const category=await Category.find()
        .countDocuments()
        res.render('index',{
            data:{user,news,category,users},
            layout:'./layout'
        })
};

