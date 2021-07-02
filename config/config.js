const mongoose=require('mongoose')
//const dbUrl='mongodb://localhost:27017/news'
const dbUrl='mongodb+srv://supAdmin:g123456@cluster0.nfmoh.mongodb.net/kunuz?retryWrites=true&w=majority'
const connectDB= async ()=>{
    const conn=await mongoose.connect(dbUrl,{
        useFindAndModify:false,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useNewUrlParser:true,
    }); 
     console.log(`MongoDB Connected ${conn.connection.host}`)
}
module.exports=connectDB