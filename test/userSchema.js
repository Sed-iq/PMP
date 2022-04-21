const mongoose = require('mongoose'),
    Schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        FB_ID: {
            type: String,
            required: true
        }
    })

module.exports = mongoose.model('/tester', Schema)