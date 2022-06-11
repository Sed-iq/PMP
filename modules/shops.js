const mongoose = require('mongoose'),
  Shop = new mongoose.Schema({
    referenceId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true
    },
    picture: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    item_ref: {
      type: Array
    },
    phone_no: {
      type: Number || String
    },
  }, { timestamps: true })

module.exports = mongoose.model('shop', Shop)
