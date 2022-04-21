// Original KSM backend written by Ikki Tenrio the born coder

const express = require('express'),
    Router = express.Router(),
    nodemailer = require("nodemailer"),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('./userSchema'),
    session = require('express-session'),
    flash = require('express-flash'),
    auth = require('./auth'),
    shop = require('./createShop')


// Middleware
Router.use('/public', express.static('public')),
    Router.use(flash())
Router.use(express.urlencoded({ extended: false }))
Router.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
}))
Router.use(express.json())
Router.use(passport.initialize())
Router.use(passport.session())
Router.use(shop.createShop)

// Session checker
Router.get('/', (req, res) => {
    res.redirect('/register')
})
passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: "https://localhost:3000/auth/facebook/ksm",

    profileFields: [
        'id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email'
    ]
},
  async function (accessToken, refreshToken, profile, cb) {
    await User.find({ Fb_id:profile.id })
    .then(data=>{
      if(data == '') {
        let client = {
          Fb_id:profile.id,
          Firstname:profile._json.first_name,
          Lastname:profile._json.last_name,
          pic:profile._json.picture.data.url,
          email:profile._json.email,
          stores: 0
        }

        auth.saver(User,client)
      }
      else if (data != ''){
        console.log('User found logging in ....')
      }
    })
    .catch(e=>{
      console.log(e)
    })


    return cb(null , profile)
  }
));
// Auth routes
Router.get('/auth/facebook', passport.authenticate('facebook', { scope: "email" }))
Router.get('/auth/facebook/ksm' ,passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/register'
}))

Router.get('/register', auth.logger ,(req, res) => {
    res.render('login/register.ejs', {
        data: {
            flash: req.flash('error')
        }
    })
})

Router.get('/profile', /*uth.login */async (req,res)=>{
// Fb_id part temp
  await User.find({ Fb_id: '468802944794686' })
  .then(data=>{
      if(data == '')
      {
        console.log(data)
        res.redirect('/register')
      }
      else {
        res.render('home', {
          data:data[0]
        })
      }
  })
  .catch(err=>{
    console.error(err);
    req.authenticated = false
    res.redirect('/register')
  })
})

// Passport Serialization and Deserialization
passport.serializeUser(function (user, cb,) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});



module.exports = Router
