const News=require('../models/news')
const Category= require('../models/Category')

exports.createNews=async (req,res,next)=>{
  try {
    const news=new News({
        title:req.body.title,
        description:req.body.description,
        categoryID:req.body.categoryID,
        image:`/public/uploads/${req.file.filename}`
    })
    await news.save()
    .then(()=>{
        res.redirect('/new/all')
    })
    .catch((err)=>{
        res.status(500).redirect('/new/add')
    })
  } catch (error) {
    res.status(500).redirect('/new/add')
  }
}

exports.getAll=async (req,res,next)=>{
    const news= await News.find()
        .populate('categoryID',{name:1})
        .limit(12)
    res.status(200).render('admin/news',{
        data:news,
        layout:'./admin/layout'
    })
};


exports.getNewsById= async (req,res,next)=>{
    const category= await Category.find()
    const news= await News.findById({_id:req.params.id})
    res.status(200).render('admin/edit-news',{
        data:{news, category},
        layout:'./admin/layout'
    })
};

exports.getNewsByTitle= async (req,res,next)=>{
    const news= await News.findById({_id:req.params.id})
    const result= await News.find()
    const category=await Category.find()
    res.status(200).render('page/news-page',{
        data:{news, result, category},
        layout:'./page/user'
    })
};


exports.newsUpdate=async(req,res,next)=>{
    const news=await News.findByIdAndUpdate({_id:req.params.id})
    news.title=req.body.title,
    news.description=req.body.description,
    news.categoryID=req.body.categoryID
    news.image=`/public/uploads/${req.file.filename}`
    await news.save()
    .then(()=>{
       return  res.status(200).redirect('/new/all')
    })
    .catch((err)=>{
      return res.status(500).redirect(`/new/all/${news._id}`)
    })
}


exports.deleteNews = async(req,res,next)=>{
    await News.findByIdAndDelete({_id:req.params.id},(err,data)=>{
        if(err) throw err
        res.status(200).redirect('/new/all')
    })
}

