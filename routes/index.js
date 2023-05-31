const express = require('express')
const router = express.Router()
const {ensureAuth,ensureGuest} = require('../middlewares/authmiddleware')
const storydb = require('../models/stories')

//login/landing page
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{layout:'login'})
})

//dashboard
router.get('/dashboard',ensureAuth,async(req,res)=>{
    try{
        const stories = await storydb.find({user:req.user.id}).lean()
        res.render('dashboard',{
            name:req.user.firstName,
            stories
        })
    }catch(err){
         console.log(err)
         res.render('errors/500')
    }
    
})

//add story(
router.post('/stories',ensureAuth,async(req,res)=>{
    try{
        req.body.user= req.user.id
        const storyPost ={
            title:req.body.title,
            status:req.body.status,
            body:req.body.body,
            user:req.body.user
        }
        const saveStory = await storydb.create(storyPost)
        console.log(saveStory)
        res.redirect('/dashboard')
    }catch(err){
        console.log(err)
        res.render('errors/500')
    }
})


module.exports = router