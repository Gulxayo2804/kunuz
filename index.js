const express=require(`express`);
const app=express();
const bodyParser=require(`body-parser`)
const PORT=5000;
const connectDB=require('./config/config')
const urlencodedParser=bodyParser.urlencoded({extended:false})
connectDB()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/new', require('./routes/newRouter'))
app.use('/user', require('./routes/userRouter'))
app.use('/category', require('./routes/categoryRouter'))


app.listen(PORT,()=>{
    console.log(`Server on ${PORT}  running `);
})
