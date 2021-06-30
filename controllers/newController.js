const News=require('../models/news');
const User = require('../models/User');

exports.creatUser = async(req,res,next)=>{
    const result = new User({
        title:req.body.title,
        description:req.body.description,
        categoryID:req.body.categoryID,
        image:req.body.image
    })
    await result.save()
    .then(()=>{
        res.status(201).json({
            succes:true,
            data:result
        })
    })
    .catch((error)=>{
        res.status(500).json({
            succes:false,
            data:error
        })
    })
}
exports.getAll=async (req,res,next)=>{
    const news= await News.find()
        .populate('categoryID')
        .limit(12)
        .select({image:1, title:1,date:1})
    res.status(200).send(news)
};

exports.newsByDate= async (req,res,next)=>{
    const news= await News.find()
        .populate('categoryID')
        .limit(6)
        .sort({date:-1})
    res.status(200).send(news)
};
exports.getNewsById= async (req,res,next)=>{
    const news= await News.findById({_id:req.params.id})
        .select({image:1, title:1, description:1, date:1, _id:0})
    res.status(200).send(news)
}
exports.deleteNews = async(req,res,next)=>{
    await News.findByIdAndDelete({_id:req.params.id},(err,data)=>{
        if(err) throw err
        res.send("Yangilik o'chirildi ");    })
}
