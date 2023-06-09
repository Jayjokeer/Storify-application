const express = require('express')
const router =express.Router()
const passport = require('passport')

//authenticate with google
router.get('/google',passport.authenticate('google',{scope:['email','profile']}))

//google auth callback
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),
(req,res)=>{
    res.redirect('/dashboard')
})


//logout
router.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/')
    })
    
})

module.exports = router 