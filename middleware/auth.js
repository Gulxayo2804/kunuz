const User=require('../models/User')
const jwt=require('jsonwebtoken')
const secret=require('../config/secret')

exports.isAuth=async (req,res,next)=>{
    try {
        const token=  req.cookies.ascces_token
        if(!token){
            res.status(403).send("Juda Sekretniy Page (: (: (:")
        }
        await jwt.verify(token, secret.JWT_SECRET,(err,decoded)=>{
          if(err){
              throw err;
          }else{
              User.findById({_id:decoded.id})
              console.log("Ishlayapdi :)")
             next();
          }
        });
    } catch (error) {
        if(error)
        res.send("Xato")
        // res.redirect('/user/login')
    }
}