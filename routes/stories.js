const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middlewares/authmiddleware')
const { errorMonitor } = require('connect-mongo')
const {renderAddStoryPage,addNewStory,getAllStories,getSingleStoryById,updateStory,deleteStory,getAllUserStories,renderEditPage} = require('../controllers/storyController')

//render add story page//
router.get('/add',ensureAuth,renderAddStoryPage)

//post new story//
router.post('/',ensureAuth,addNewStory)

//get all the stories with status as public //
router.get('/allStories',ensureAuth,getAllStories)

//render or show the edit page //
router.get('/edit/:id',ensureAuth,renderEditPage)

//update or edit story by id //
router.put('/:id',ensureAuth, updateStory)

//get story by id //
router.get('/:id',ensureAuth,getSingleStoryById)

//delete story by  //
router.delete('/:id',ensureAuth,deleteStory)

//show all the stories for a user
router.get('/user/:id',ensureAuth,getAllUserStories)


module.exports = router