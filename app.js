// Original nodejs server program for school marketplace
// Febuary 11th 11:35pm Saturday
// By Sediq Abdullahi;
const fs = require('fs'),
    key = fs.readFileSync('./localhost/localhost.decrypted.key'),
    cert = fs.readFileSync('./localhost/localhost.crt'),
    express = require('express'),
    http = require('https'),
    env = require('dotenv').config(),
    app = express(),
    server = http.createServer({ key, cert }, app),
    PORT = process.env.PORT,
    Router = require('./modules/router.js'),
    connect = require('./modules/db.js')
// middleware
app.set('view engine', 'ejs')
app.use(Router)
connect(server, PORT)
app.use((req, res) => {
    res.send('The page you required does not exist')
})