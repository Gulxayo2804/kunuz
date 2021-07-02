const express=require(`express`);
const app=express();
const bodyParser=require(`body-parser`)
const PORT=5000;
const connectDB=require('./config/config')
const urlencodedParser=bodyParser.urlencoded({extended:false})
const ejs=require('ejs')
const path=require('path')
const layouts=require('express-ejs-layouts');
connectDB()
app.use(layouts)
const cors=require('cors')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/icons', express.static(__dirname + 'public/icons'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))
app.use('/pages', express.static(__dirname + 'public/pages'))

app.set('view engine', 'ejs')
app.set('views', './view')

// app.get('/',(req,res)=>{
//     res.render('index',{
//         layout:'./layout'
//     })
// })

app.use('/admin',require('./routes/statisticsRouter') )
app.use('/new', require('./routes/newRouter'))
app.use('/user', require('./routes/userRouter'))
app.use('/category', require('./routes/categoryRouter'))

app.listen(PORT,()=>{
    console.log(`Server on ${PORT}  running `);
})
