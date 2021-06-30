const User = require('../models/User');
exports.crearUser = async (req,res)=>{
    const result = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    await result.save()
    .then(()=>{
        res.status(201).json({
            succes:true,
            data:result
        })
    })
    .catch((error)=>{
        res.status(500).json({
            succes:false,
            data:error
        })
    })
}

exports.deleteUser = async (req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        succes:true,
        data:[]
    })
}
exports.editUser = async(req,res)=>{
 const user = await User.findByIdAndUpdate({_id:req.params.id})
 user.name = req.body.name,
 user.email = req.body.email,
 user.password = req.body.password
 user.save()
 .then(()=>{
     res.status(200).json({
         succes:true,
         data:user
     })
 })
 .catch((err)=>{
     res.status(500).json({
         succes:false,
         data:err
     })
 })
}