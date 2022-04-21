// Original nodejs server program for school marketplace
// Febuary 11th 11:35pm Saturday
// By Sediq Abdullahi;
/* **** */
const fs = require('fs');
const express = require('express'),
    http = require('http'),
    env = require('dotenv').config(),
    app = express(),
    server = http.createServer(app),
    PORT = process.env.PORT,
    Router = require('./modules/router.js'),
    connect = require('./modules/db.js')
// middleware
app.set('view engine', 'ejs')
app.use(Router)

connect(server, PORT)