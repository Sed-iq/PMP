const express = require('express'),
    app = express(),
    User = require('./userSchema'),
    db = require('mongoose'),
    session = require('express-session')
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

app.use(session({
    secret: "SECRET",
    saveUninitialized: false,
    resave: false
}))
app.use(passport.initialize());
app.use(passport.session());
db.connect('mongodb://192.168.43.1')
    .then(e => {
        app.listen(3000, 'codes', console.log('Server running'))
    })

//Routes

//User gets here upon successful login
app.get('/home', (req, res) => {
    res.json({ user: req.user });
});

//This is so you know if a Login attempt failed
app.get('/login', (req, res) => {
    res.json({ msg: "login failed" });
});

//This endpoint connects the User to Facebook
app.get('/login/facebook', passport.authenticate('facebook'));

//This endpoint is the Facebook Callback URL and on success or failure returns a response to the app
app.get('/auth/facebook/ksm', passport.authenticate('facebook', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/home');
});
const fb = '5f6cd172db50616f20218344f5b17ddc'

passport.serializeUser(function (user, cb) { cb(null, user); });
passport.deserializeUser(function (obj, cb) { cb(null, obj); });

passport.use(new Strategy({ //This is class constructor argument telling Passport to create a new Facebook Auth Strategy
    clientID: 484561096445337,//The App ID generated when app was created on https://developers.facebook.com/
    clientSecret: fb,//The App Secret generated when app was created on https://developers.facebook.com/
    callbackURL: 'https://localhost:3000/auth/facebook/ksm',
    profile: ['id', 'displayName'] // You have the option to specify the profile objects you want returned
},
    function (accessToken, refreshToken, profile, done) {
        //Check the DB to find a User with the profile.id
        User.findOne({ FB_ID: profile.id }, function (err, user) {//See if a User already exists with the Facebook ID
            if (err) {
                console.log(err);  // handle errors!
            }

            if (user) {
                done(null, user); //If User already exists login as stated on line 10 return User
            } else { //else create a new User
                user = new User({
                    FB_ID: profile.id, //pass in the id and displayName params from Facebook
                    name: profile.displayName
                });
                user.save(function (err) { //Save User if there are no errors else redirect to login route
                    if (err) {
                        console.log(err);  // handle errors!
                    } else {
                        console.log("saving user ...");
                        done(null, user);
                    }
                });
            }
        });
    }
));