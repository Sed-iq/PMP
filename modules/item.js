const mongoose = require('mongoose'),
      Item = new mongoose.Schema({
        shop_id: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        picture: {
          type: String,
          // required: true
        },
        serial_no :{
          type: Number,
          required: true
        },
        remaining: {
          type: Number,
          required: true
        },
        description:{
          type: String,
          required: true
        }
      })

module.exports = mongoose.model('item', Item)
