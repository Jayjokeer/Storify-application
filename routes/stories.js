const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middlewares/authmiddleware')
const storydb = require('../models/stories')
const { errorMonitor } = require('connect-mongo')

router.get('/add',ensureAuth,(req,res)=>{
    res.render('stories/add')
})

router.get('/allStories',ensureAuth,async(req,res)=>{
    try{
        const stories = await storydb.find({status:'public'}).sort({createdAt:'desc'}).populate('user')
        .lean()
        res.render('stories/index',{stories:stories})
    }catch(err){
        console.log(err)
        res.render('errors/500')
    }
})
router.get('/edit/:id',ensureAuth,async(req,res)=>{
    const story = await storydb.findOne({
        _id:req.params.id
    }).lean()
    if(!story){
        return res.render('errors/404')
    }
    if(story.user!= req.user.id){
        res.redirect('/allStories')
    }else{
        res.render('stories/edit',{story})
    }
})

router.put('/stories/edit/:id',ensureAuth, async(req,res)=>{
    const {title,body,status} = req.body
    try{
        const updatedStories = new storydb({
            title:title,
            body:body,
            status:status
        })
        const savedStories= await updatedStories.save()
        console.log(savedStories)
        res.redirect('/stories/:id')
    }catch(err){
        console.log(err)
        res.render('errors/404')
    }
     

})
module.exports = router