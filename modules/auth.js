const mongoose = require('mongoose'),
    User = require('./userSchema'),
    isLoggedOut = (req, res, next) => {
      // Checks if you are already logged in 
      // Should be put at register page
        if (req.isAuthenticated()){
          res.redirect('/profile')
        }
        else {
            req.flash('error', 'You have to login to view you profile')
            next()
        }
    }
    isLoggedIn = (req,res,next)=>{
      if(req.isAuthenticated()) {
        next()
      }
      else {
        res.redirect('/register')
      }
    },

    // Database saver
    saver = async (User, data, cb) =>{
      let user = new User(data)
      await user.save()
      .then(result =>{
        cb
      })
      .catch(err=>{
        console.log(err)
      })
    }

  module.exports.logger = isLoggedOut
  module.exports.login = isLoggedIn
  module.exports.saver = saver
