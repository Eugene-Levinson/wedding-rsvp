import {config} from "./config"
import express from 'express'

import {rsvpPage, submitData} from './lib/handlers'

import expressLayouts from 'express-ejs-layouts';
import asyncHandler from "express-async-handler"
import bodyParser from "body-parser";



var fs = require('fs');
var http = require('http');
var https = require('https');

///// SET UP /////
var path = require('path');


const app = express()

app.use(expressLayouts)
app.engine('html', require('ejs').renderFile)
app.set('layout', 'common.ejs')
app.set('views', path.join(__dirname + '/static/templates'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())





// for debugging
// app.get('/:page_name', function(req, res){
//   res.sendFile(path.join(__dirname + `/static/templates/${req.params.page_name}`));
// });

app.use(function(req, res, next) {
  if (!req.path.includes('/assets') && req.path !== '/rsvp') {
    res.redirect('/rsvp');
  } else {
    next();
  }
});

//static files
app.use('/assets', express.static(path.join(__dirname + '/static/assets')))


///// ROUTES /////
app.get('/rsvp', asyncHandler(rsvpPage))

/// POST REQUESTS ///

app.post('/rsvp', asyncHandler(submitData))


var http_server: any;

http_server = http.createServer(app);
//listen for requests on the http port
http_server.listen(config.port)

console.log(`Server running on port ${config.port}`)