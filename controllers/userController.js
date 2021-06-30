const User = require('../models/User');
const bcrypt=require('bcrypt')
const saltRounds=12
const jwt=require('jsonwebtoken')
const secret=require('../config/secret')


exports.createUser = async (req,res)=>{
    const salt=await bcrypt.genSalt(saltRounds)
    const password=await bcrypt.hash(req.body.password, salt)
    const result = new User({
        name:req.body.name,
        email:req.body.email,
        password:password
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

exports.login = async(req,res,next)=>{
    await User.findOne({email:req.body.email}, (err,user)=>{
        if(err){
            res.send(err)
        }
        if(!user){
            res.status(404).json({
                success:false,
                data:'User not found'
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            res.status(401).json({
                success:false,
                data:'Invalid parol'
            })
        }
        console.log(user._id)
        let token;
        let payload = {id:user._id}
        token = JWT.sign(payload, secret.JWT_SECRET);
        res.status(200).json({
            data:token
        })
    })
}

exports.getMe = async(req,res,next)=>{
    const token = req.headers.authorization
    let probel=token.indexOf(' ');
    const me = JWT.decode(token.slice(probel+1))
    user = await User.findOne({_id:me.id})
    .select({password:0})
    res.status(200).send(user);
}

exports.deleteUser = async (req,res)=>{
    await User.findByIdAndDelete({_id:req.params.id})
    res.status(200).json({
        succes:true,
        data:[]
    })
}
exports.editUser = async(req,res)=>{
    const user = await User.findByIdAndUpdate({_id:req.params.id})
    const salt=await bcrypt.genSalt(saltRounds)
    const password=await bcrypt.hash(req.body.password, salt)
    user.name = req.body.name,
    user.email = req.body.email,
     user.password =password
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