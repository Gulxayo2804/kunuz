const News=require('../models/news')

exports.createNews=async (req,res,next)=>{
    const news=new News({
        title:req.body.title,
        description:req.body.description,
        categoryID:req.body.categoryID,
        image:`/public/uploads${req.file.filename}`
    })
    await news.save()
    .then(()=>{
        res.status(201).json({
            success:true,
            data:news
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success:false,
            data:err
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
        .select({image:1, title:1, date:1})
    res.status(200).send(news)
};
exports.getNewsById= async (req,res,next)=>{
    const news= await News.findById({_id:req.params.id})
        .select({image:1, title:1, description:1, date:1, _id:0})
    res.status(200).send(news)
};

exports.newsUpdate=async(req,res,next)=>{
    const news=await News.findByIdAndUpdate({_id:req.params.id})
    news.title=req.body.title,
    news.description=req.body.description,
    news.categoryID=req.body.categoryID,
    news.image=`/public/uploads${req.file.filename}`
    await news.save()
    .then(()=>{
        res.status(200).json({
            success:true,
            data:news
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success:false,
            data:err
        })
    })
}
exports.editnew = async(req,res)=>{
    const news = await News.findByIdAndUpdate({_id:req.params.id})
    news.title = req.body.title,
    news.description = req.body.description,
    user.categoryID = req.body.categoryID
    news.save()
    .then(()=>{
        res.status(200).json({
            success:true,
            data:user
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success:false,
            data:err
        })
    })
   }
exports.deleteNews = async(req,res,next)=>{
    await News.findByIdAndDelete({_id:req.params.id},(err,data)=>{
        if(err) throw err
        res.send("Malumot bazadan uchdi ");
    })
}

