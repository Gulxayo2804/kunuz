const mongoose=require('mongoose')
const dbUrl='mongodb://localhost:27017/news'
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