require('dotenv').config()
const express  = require('express')
const port = process.env.PORT || 8000
const morgan = require('morgan')
const session = require('express-session')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const passport = require('passport')
const mongoose = require('mongoose')
const Mongostore = require('connect-mongo')
require('./db')
require('./config/passport')(passport) 

//middlewares
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: Mongostore.create({mongoUrl:process.env.MONGO_URI})
  }))
app.use(passport.initialize())
app.use(passport.session())
if(process.env.NODE_ENV === 'development'){ 
    app.use(morgan('dev'))
}

//view engine
app.engine('hbs',exphbs.engine({extname:'.hbs',defaultLayout:'main'}))
app.set('view engine','hbs')
app.set('views', './views')

//routes
app.use('/',require('./routes/index.js'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))

app.listen(port,()=>{
    console.log(`server running on ${process.env.NODE_ENV} mode http://localhost:${port}`)
})
