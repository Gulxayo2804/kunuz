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



// exports.authorize = (...roles) => {
//     return (req, res, next) => {
//         this.protect(req, res, next);
//         if (!req.user || !roles.includes(req.user.role)) {
//             return res.status(403).json({ message: "Access denied" })
//         }
//         next();
//     }
// }

