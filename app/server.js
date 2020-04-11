// semi-colon ; is optional in Node.js and browser JavaScript
'use strict' // enables "strict mode", a feature allowing for placing functions/programs in a strict context

// 1: import NPM dependencies (modules)
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var sequelize = require('sequelize');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var path = require('path');

// 2: app-related modules
var hookJWTStrategy = require('./services/passportStrategy');

// 3: initialize the Express app (server)
var app = express();

// 4: enable Express app to parse data as urlencoded & JSON
// load two middleware methods
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ? 5: load morgan HTTP REQUEST logger middleware & set the format for development use.
app.use(morgan('dev'));

// 6: initialize and load/hook authentication middleware
app.use(passport.initialize());
// hook the passport JWT strategy
hookJWTStrategy(passport);



// routing system
// 7: set up static files location, Express will serve all files in here to front-end client
// __dirname is the directory where you lanch Express app
app.use(express.static(__dirname + '../../public'));


// bundle API routes
var api = require('./routes/api')(passport);  // api is a router object
app.use('/api', api); // to mount the returned value of the function as a middleware



/** 8: create home route and return a string to deal with request 'localhost:3000/'
app.get('/', (req, res) => {
    console.log(req.body)
    res.send('Nice meeting you, I am Leyton from Express app')
});
app.get('/ab*cd', (req, res) => {
    res.send('haha, this is my "about" page')
});*/

// catch all routes
app.get('*', function(req, res){
    console.log(req.body);
    res.sendFile(path.join(__dirname, '../public/app/views/index.html'));
});


// 9: start the serve to listen to requests
const port = 3000
app.listen(port, () => {
    console.log('app is listening on port ' + port + '!');
})
