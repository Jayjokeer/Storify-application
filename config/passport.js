const googleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const userdb = require('../models/user')
const { profile } = require('console')
const passport = require('passport')

module.exports = function(passport){
    passport.use(new googleStrategy(
        {
            clientID:process.env.OAUTH_ID,
            clientSecret:process.env.OAUTH_SECRET,
            callbackURL:'/auth/google/callback'
        },
        async(accessToken,refreshToken,profile,done)=>{
            const newUser = {
                googleId:profile.id,
                displayName:profile.displayName,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                image:profile.photos[0].value
            }
            console.log(profile)
            try{
                const foundUser= await userdb.findOne({googleId:profile.id})
                if(foundUser){
                    done(null,foundUser)
                }
                const addedUser= await userdb.create(newUser)
                    done(null,addedUser)

            }catch(err){
                console.log(err)
            }
        }
    ))

    passport.serializeUser((addedUser,done)=>{
        done(null,addedUser.id)
    })
    passport.deserializeUser(async(id,done)=>{
        const user = await userdb.findById(id)
        done(null,user)
    }) 
}  