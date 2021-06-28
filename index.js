

const express=require(`express`);
const app=express();
const bodyParser=require(`body-parser`)
const PORT=5000;
const connectDB=require('./config/config')
connectDB()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/new', require('./routes/newRouter'))


app.listen(PORT,()=>{
    console.log(`Server on ${PORT}  running `);
})
