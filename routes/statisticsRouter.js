const router=require('express').Router()
const {userNumber, newNumber, categoryNumber}=require('../controllers/statistics')
router.get('/usernumber',(req,res,next)=>{
    res.render('index', {
    })
})
router.get('/usernumber', userNumber)
router.get('/newnumber', newNumber)
router.get('/categorynumber',categoryNumber)

module.exports=router