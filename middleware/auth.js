const User=require('../models/User')
const jwt=require('jsonwebtoken')
const secret=require('../config/secret')

exports.protect= (req,res,next)=>{
    let token=req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).send("Token bo'lmaganligi sababli routerga kirish huquqi yo'q")
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

