const News=require(`../models/news`)
exports.deleteNews = async(req,res,next)=>{
    await News.findByIdAndDelete({_id:req.params.id},(err,data)=>{
        if(err) throw err
        res.send("Yangilik o'chirildi ");
    })
}