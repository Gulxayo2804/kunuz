

const express=require(`express`);
const app=express();
const bodyParser=require(`body-parser`)
const PORT=5000;
app.use(bodyParser.json());




app.listen(PORT,()=>{
    console.log(`Server on ${PORT}  running `);
})
