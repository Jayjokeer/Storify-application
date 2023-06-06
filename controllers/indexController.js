const storydb = require('../models/stories')

const showDashboard = async(req,res)=>{
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
    
}

module.exports = showDashboard