const User=require('../models/User')
const New=require('../models/news')
const Cartegory=require('../models/Category')

exports.userNumber=async (req,res,next)=>{
    const user=await User.find()
        .countDocuments()
        res.status(200).send(user.toString())
};

exports.newNumber=async (req,res,next)=>{
    const news=await New.find()
        .countDocuments()
        res.status(200).send(news.toString())
};

exports.categoryNumber=async (req,res,next)=>{
    const category=await New.find()
        .countDocuments()
        // res.json({
        //     data:category
        // })
        res.render('index',{
            data:category,
            layout:'./layout'
        })
        console.log(category)
}