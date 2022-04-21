const mongoose = require('mongoose'),
    env = require('dotenv').config(),
    DB = process.env.DB

const connect = async (server, port) => {
    await mongoose.connect(DB, (err) => {
        if (err)
            console.log('Error: \n' + err)
        else
            server.listen(port ,e=> console.log(port))
    })
}

module.exports = connect
