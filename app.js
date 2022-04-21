// Original nodejs server program for school marketplace
// Febuary 11th 11:35pm Saturday
// By Sediq Abdullahi;
/* **** */
const fs = require('fs');
const key = fs.readFileSync('./cert/CA/localhost/localhost.decrypted.key');
const cert = fs.readFileSync('./cert/CA/localhost/localhost.crt');
const express = require('express'),
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