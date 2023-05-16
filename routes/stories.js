const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middlewares/authmiddleware')
const storydb = require('../models/stories')

router.get('/add',ensureAuth,(req,res)=>{
    res.render('stories/add')
})

module.exports = router