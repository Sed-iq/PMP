// KSM copyright protected codes 
// Any form of copyright is prohibited

const expressCookie = require('express-cookie')

// xoxo
const express = require('express'),
  Router = express.Router(),
  passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  User = require('./userSchema'),
  session = require('express-session'),
  flash = require('express-flash'),
  auth = require('./auth'),
  createShop = require('./createShop'),
  fs = require('fs'),
  createItem = require('./itemHandler'),
  cookie = require('cookie-parser')
// Middleware
Router.use('/public', express.static('public'))
Router.use(flash())
Router.use(express.urlencoded({ extended: false }))
Router.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
}))
Router.use(cookie('8057855844941038'))
Router.use(express.json())
Router.use(passport.initialize())
Router.use(passport.session())
Router.use(createShop.router)
Router.use(createItem)
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
    await User.find({ Fb_id: profile.id })
      .then(data => {
        if (data == '') {
          let client = {
            Fb_id: profile.id,
            Firstname: profile._json.first_name,
            Lastname: profile._json.last_name,
            pic: profile._json.picture.data.url,
            email: profile._json.email,
            stores: 0
          }
          function createFolder(name) {
            fs.mkdir(`${__dirname}/../public/users/${name}`, err => {
              if (err) console.log(err)
            })
          }
          auth.saver(User, client, createFolder(profile.id))
        }
      })
      .catch(e => {
        console.log(e)
      })
    return cb(null, profile)
  }
));
// Auth routes
Router.get('/auth/facebook', passport.authenticate('facebook', { scope: "email" }))
Router.get('/auth/facebook/ksm', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/df'
}))

Router.get('/register',/* auth.logger ,*/(req, res) => {
  res.render('register.ejs', {
    data: {
      flash: req.flash('error')
    }
  })
})
Router.get('/profile', /*auth.login,*/(req, res) => {
  //  Profile viewing page
  res.send('this is the profile viewing page')
})
// Passport Serialization and Deserialization
passport.serializeUser(function (user, cb,) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
module.exports = Router