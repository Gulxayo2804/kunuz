const News=require('../models/news')

exports.createNews=async (req,res,next)=>{
    const news=new News({
        title:req.body.title,
        description:req.body.description,
        categoryID:req.body.categoryID,
        // image:`/public/uploads${req.file.filename}`
    })
    await news.save()
    .then(()=>{
        res.redirect('/admin')
    })
    .catch((err)=>{
        res.status(500).redirect('/new/add')
    })
}

exports.getAll=async (req,res,next)=>{
    const news= await News.find()
        .populate('categoryID')
        .limit(12)
    res.status(200).render('news',{
        data:news,
        layout:'./layout'
    })
};

exports.newsByDate= async (req,res,next)=>{
    const news= await News.find()
        .populate('categoryID')
        .limit(6)
        .sort({date:-1})
        .select({image:1, title:1})
    res.status(200).send(news)
};
exports.getNewsById= async (req,res,next)=>{
    const news= await News.findById({_id:req.params.id})
    res.status(200).render('edit-news',{
        data:news,
        layout:'./layout'
    })
};

exports.newsUpdate=async(req,res,next)=>{
    const news=await News.findByIdAndUpdate({_id:req.params.id})
    news.title=req.body.title,
    news.description=req.body.description,
    news.categoryID=req.body.categoryID
    // news.image=`/public/uploads${req.file.filename}`
    await news.save()
    .then(()=>{
        res.status(200).redirect('/new/all')
    })
    .catch((err)=>{
        res.status(500).redirect(`/new/all/${news._id}`)
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
            succes:true,
            data:user
        })
    })
    .catch((err)=>{
        res.status(500).json({
            succes:false,
            data:err
        })
    })
   }
exports.deleteNews = async(req,res,next)=>{
    await News.findByIdAndDelete({_id:req.params.id},(err,data)=>{
        if(err) throw err
        res.status(200).redirect('/new/all')
    })
}

