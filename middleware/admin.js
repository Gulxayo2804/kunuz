exports.superAdmin=(req,res,next)=>{
    let token=req.headers.authorization;
    const decoded=jwt.verify(token, secret.JWT_SECRET)
    if(!token){
        return res.status(401).send("Token bo'lmaganligi sababli routerga kirish huquqi yo'q")
    }if(decoded.roles==="admin"||decoded.roles==="user"){
        return res.status(401).send("Sizda Adminlik huquqi yo'q")
    }if(decoded.roles==="superAdmin"){
         next();
    }  
}

exports.admin=(req,res,next)=>{
    let token=req.headers.authorization;
    const decoded=jwt.verify(token, secret.JWT_SECRET)
    if(!token){
        return res.status(401).send("Token bo'lmaganligi sababli routerga kirish huquqi yo'q")
    }if(decoded.roles==="user"){
        return res.status(401).send("Sizda Adminlik huquqi yo'q")
    }if(decoded.roles==="admin"||decoded.roles==="superAdmin"){
         next();
    }  
}