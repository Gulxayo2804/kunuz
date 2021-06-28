const News=require('../models/news')


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