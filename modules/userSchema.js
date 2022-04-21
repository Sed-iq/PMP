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
          type:String,
        },
        shops: {
          type: Array,
        },
        email: {
          type: String
        }
    }, { timestamps: true })
module.exports = mongoose.model('userProfile', User)
