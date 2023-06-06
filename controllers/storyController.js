const storydb = require('../models/stories')
const { errorMonitor } = require('connect-mongo')

const renderAddStoryPage = (req,res)=>{
    res.render('stories/add')}

const addNewStory = async(req,res)=>{
    try{
        req.body.user= req.user.id
        const storyPost ={
            title:req.body.title,
            status:req.body.status,
            body:req.body.body,
            user:req.body.user
        }
        const saveStory = await storydb.create(storyPost)
        res.redirect('/dashboard')
    }catch(err){
        console.log(err)
        res.render('errors/500')
    }
}

const getAllStories = async(req,res)=>{
    try{
        const stories = await storydb.find({status:'public'}).sort({createdAt:'desc'}).populate('user')
        .lean()
        res.render('stories/index',{stories:stories})
    }catch(err){
        console.log(err)
        res.render('errors/500')
    }
}

const getSingleStoryById = async(req,res)=>{
    const id = req.params.id
    try{
        const story = await storydb.findById({_id:id}).populate('user').lean()
        res.render('stories/show',{story})
    }catch(err){
        console.log(err)
        res.render('erorr/500')
    }

}

const renderEditPage = async(req,res)=>{  
    try{
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
    } catch(err){
     console.log(err)
     res.render('error/500')
    }
 }

const getAllUserStories = async(req,res)=>{
    const id = req.params.id
    try{
        const stories = await storydb.find({user:id,status:'public'}).populate('user').lean()
        res.render('stories/index',{stories}) 
    } catch(err){
        console.log(err)
        res.render('error/500')
    }
}

const updateStory = async(req,res)=>{
    const {title,body,status} = req.body
    const id = req.params.id
    try{
        const story = await storydb.findById({_id:id}).lean()
        if(!story){
            res.render('errors/404')
        }
        if(story.user == req.user.id){
            await storydb.findByIdAndUpdate({_id:id},req.body,{
                new:true,
                runValidators:true
            })
            res.redirect('/dashboard')
            
        }else{
            res.redirect('/stories/allStories')
        }
        
        
    }catch(err){
        console.log(err)
        res.render('errors/404')
    }
     

}

const deleteStory =async(req,res)=>{
    const id= req.params.id
    try{
        const deleteStory = await storydb.findByIdAndRemove({_id:id})
        res.redirect('/dashboard')
    }catch(err){
        console.log(err)
        res.render('error/500')
    }
    
   
}





module.exports ={renderAddStoryPage,addNewStory,getAllStories,getSingleStoryById,updateStory,deleteStory,getAllUserStories,renderEditPage}