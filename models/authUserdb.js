const mongoose = require('mongoose')

const authdbSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'first name is required']
    },
    lastName:{
        type:String,
        required:[true, 'last name is required']
    },
    username:{
        type:String,
        required:[true, 'username is required']
    },
    password:{
        String,
        required:[true, 'password is required']
    },
    email:{
        type:String,
        required:[true, 'first name is required']
    }
})

module.exports= mongoose.model('authdb',authdbSchema)