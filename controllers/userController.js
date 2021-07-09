const User = require('../models/User');
const bcrypt=require('bcrypt')
const saltRounds=12
const secret=require('../config/secret')
const jwt=require('jsonwebtoken')

exports.createUser = async (req,res)=>{
    try {
        const salt=await bcrypt.genSaltSync(saltRounds)
        const password=await bcrypt.hashSync(req.body.password, salt)
        const result = new User({
            name:req.body.name,
            email:req.body.email,
            role:req.body.role,
            password:password
        })
        await result.save()
        .then(()=>{
            res.redirect('/admin')
        })
        .catch((error)=>{
            res.status(500).redirect('/user/add')
        })
        
    } catch (error) {
        res.status(500).redirect('/user/add')
    }
}

exports.login = async (req,res,next)=>{
    try {
        await User.findOne({email:req.body.email}, (err,user)=>{
            if(err){
                return res.status(401).redirect('/user/login')
            }
            if(!user){
                res.status(404).json({
                    success:false,
                    data:'User not found'
                })
                return res.status(404).redirect('/user/login')
                
            }
            if(!bcrypt.compareSync(req.body.password, user.password)){
               return  res.status(401).redirect('/user/login')
            }
            let token;
            let payload = {id:user._id,roles:user.role}
            token = jwt.sign(payload, secret.JWT_SECRET);
            res.redirect('/admin')
        })
        
    } catch (error) {
        res.status(500).redirect('/user/login')
    }
}

exports.getMe = async(req,res,next)=>{
    try {
        const token = req.headers.authorization
        let probel=token.indexOf(' ');
        const me = jwt.decode(token.slice(probel+1))
        user = await User.findOne({_id:me.id})
        .select({password:0})
        res.status(200).send(user);
        
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getElementById=async (req,res,next)=>{
    try {
        const user= await User.findById({_id:req.params.id})
        res.status(200).render('admin/edit-admin', {
            data:user,
            layout:'./admin/layout'
        })
        
    } catch (error) {
        res.status(500).redirect('/admin')
    }
}

exports.deleteUser = async (req,res,next)=>{
    try {
        await User.findByIdAndDelete({_id:req.params.id})
        res.status(200).redirect('/admin')
        
    } catch (error) {
        res.status(500).redirect('/admin')
    }
}

exports.editUser = async(req,res,next)=>{
    try {
        const salt=await bcrypt.genSalt(saltRounds)
        const password=await bcrypt.hash(req.body.password, salt)
        const user = await User.findByIdAndUpdate({_id:req.params.id})
        user.name = req.body.name,
        user.email = req.body.email,
        user.role=req.body.role,
        user.password =password
        await user.save()
        .then(()=>{
            res.status(200).redirect('/admin')
        })
        .catch((err)=>{
         res.status(500).redirect(`/user/${user._id}`)
        })
        
    } catch (error) {
        res.status(500).redirect(`/user/${user._id}`)
    }
}

