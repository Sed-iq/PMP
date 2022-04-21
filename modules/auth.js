const mongoose = require('mongoose'),
    User = require('./userSchema'),

    isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()){
          res.redirect('/profile')
        }
        else {
            req.flash('error', 'You have to login to view you profile')
            next()
        }
    }

    // Checking if the user is logged out
    isLoggedOut = (req,res,next)=>{
      if(req.isAuthenticated()) {
        next()
      }
      else {
        res.redirect('/register')
        console.log('You are not logged in')
      }
    },

    // Database saver
    saver = async (User, data, cb) =>{
      let user = new User(data)
      await user.save()
      .then(result =>{
        console.log(result)
      })
      .catch(err=>{
        console.log(err)
      })
    }

  module.exports.logger = isLoggedIn
  module.exports.login = isLoggedOut
  module.exports.saver = saver
