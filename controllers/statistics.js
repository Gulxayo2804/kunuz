const User=require('../models/User')
const New=require('../models/news')
const Category=require('../models/Category')

exports.userNumber=async (req,res,next)=>{
    try {
        const user=await User.find()
            .countDocuments()
        const users=await User.find({role:'admin'})
        const news=await New.find()
            .countDocuments()
        const category=await Category.find()
            .countDocuments()
            res.render('admin/index',{
                data:{user,news,category,users},
                layout:'./admin/layout'
            })
        
    } catch (error) {
        res.status(500).redirect('/admin')
    }
};

