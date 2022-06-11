const mongoose = require('mongoose'),
  User = new mongoose.Schema({
    Fb_id: {
      type: String,
      required: true
    },
    Firstname: {
      type: String,
      required: true
    },
    Lastname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
    },
    pic: {
      type: String,
    },
    email: {
      type: String
    },
    shops: {
      type: Array
    }
  }, { timestamps: true })
module.exports = mongoose.model('userProfile', User)
