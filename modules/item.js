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
    number: { type: Number, required: true },
    delivery_duration: { type: Number, required: true }
  }, { timestamps: true })

module.exports = mongoose.model('item', Item)
