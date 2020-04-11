// app/services/passportStrategy.js

'use strict'

var JWTStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var User = require('./../models/user')
var config = require('./../config')


// Set up Passport to use the JWT Strategy, which is invoked at server.js
/***
 * The goal of the function below is to tell passport:
 * 1) in requests, where to extract encrypted JWT;  
 * 2) use what 'secret' to decrypt out the JWT;
 * 3) in the database table - User, make a query to check if username exists in the table 
 **/
function hookJWTStrategy(passport){
    var options = {};

    // set up how to extract JWT from requests (from Authorization Header in HTTP request).
    // This function works as a callback, with request as input, and returns the encoded JWT/null 
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    // sercret will be used to decrypt the 'encrypted JWT'
    options.secretOrKey = config.keys.secret;
    // A JWT will always has expiry date.
    options.ignoreExpiration = false; 

    // function JWTStrategy(JWTPayload, callback) is a 'verify' function
    // the argument 'JWTPayload' is a decoded JWT payload
    passport.use(new JWTStrategy(options, function(JWTPayload, callback) {
        
        // find the first user instance in Sequelize User Model, 
        // where email == JWTPayload.username
        User.findOne({ where: { email: JWTPayload.username } }) ////??????
            .then(function(user) {
                if(!user) { ////?????
                    callback(null, false);
                    return;
                }

                callback(null, user);
            });
    }));
}

// export the hookJWTStrategy function
module.exports = hookJWTStrategy
