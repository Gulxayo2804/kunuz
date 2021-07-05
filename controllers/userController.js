const User = require('../models/User');
const bcrypt=require('bcrypt')
const saltRounds=12
const secret=require('../config/secret')
const jwt=require('jsonwebtoken')


exports.createUser = async (req,res)=>{
    const salt=await bcrypt.genSaltSync(saltRounds)
    const password=await bcrypt.hashSync(req.body.password, salt)
    const result = new User({
        name:req.body.name,
        email:req.body.email,
        password:password
    })
    await result.save()
    .then(()=>{
        res.status(201).json({
            success:true,
            data:result
        })
    })
    .catch((error)=>{
        res.status(500).json({
            success:false,
            data:error
        })
    })
}

exports.login = async (req,res,next)=>{
    await User.findOne({email:req.body.email}, (err,user)=>{
        if(err){
            res.status(401).send(err)
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
        let token;
        let payload = {id:user._id,roles:user.role}
        token = jwt.sign(payload, secret.JWT_SECRET);
        res.redirect('/')
    })
}

exports.getMe = async(req,res,next)=>{
    const token = req.headers.authorization
    let probel=token.indexOf(' ');
    const me = jwt.decode(token.slice(probel+1))
    user = await User.findOne({_id:me.id})
    .select({password:0})
    res.status(200).send(user);
}

exports.getAll= async (req,res,next)=>{
    const users= await User.find()
        .select({name:1})
        // res.status(200).json({
        //     success:true,
        //     data:users
        // })
    res.render('index', {
        data:users,
        layout:'./layout'
    })
}

exports.deleteUser = async (req,res)=>{
    await User.findByIdAndDelete({_id:req.params.id})
    res.status(200).json({
        success:true,
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
         success:true,
         data:user
         })
    })
    .catch((err)=>{
     res.status(500).json({
         success:false,
         data:err
      })
    })
}

