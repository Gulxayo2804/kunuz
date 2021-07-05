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
const methodOverride = require('method-override');
app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

app.set('view engine', 'ejs')
app.set('views', './view/admin')
app.set('views', './view/page')

app.get('/',(req,res)=>{
    res.render('user',{
        layout:'./layout1'
    })
})-

app.use('/admin',require('./routes/statisticsRouter') )
app.use('/new', require('./routes/newRouter'))
app.use('/user', require('./routes/userRouter'))
app.use('/category', require('./routes/categoryRouter'))

app.listen(PORT,()=>{
    console.log(`Server on ${PORT}  running `);
})
