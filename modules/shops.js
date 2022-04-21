const mongoose = require('mongoose'),
    Shop = new mongoose.Schema(
      {
      user_ref: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        // required: true
      },
      picture: {
        type: String,
      },
      location: {
          type: String,
          required: true
        },
      phone_no: {
        type: Number,
        required: true
      },
      email: 'String',
      visitors: 'Number',
      items_ref : {
        type: Array
      },
    }, { timestamps:true })

  module.exports = mongoose.model('shop', Shop)
