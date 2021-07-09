const User=require('../models/User')
const jwt=require('jsonwebtoken')
const secret=require('../config/secret')

exports.protect= (req,res,next)=>{
    let token;
    token=req.headers.authorization;
    console.log(token);
    if(!token){
       return res.status(401).redirect('/user/login') 
    }
    try {
        const decoded=jwt.verify(token, secret.JWT_SECRET)
        User.findById({_id:decoded.id})
            next()
    } catch (error) {
        if(error)
        res.status(400).send("Yaroqsiz token")
    }
}
