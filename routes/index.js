const express = require('express')
const router = express.Router()
const {ensureAuth,ensureGuest} = require('../middlewares/authmiddleware')
const showDashboard = require('../controllers/indexController')

//login/landing page
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{layout:'login'})
})

// show dashboard
router.get('/dashboard',ensureAuth,showDashboard)





module.exports = router