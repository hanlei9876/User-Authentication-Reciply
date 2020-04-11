'use strict'

var jwt = require('jsonwebtoken');

var config = require('../config');
var db = require('../services/database');  // a sequelize instance
var User = require('../models/user');

var AuthController = {};


// implement the 'register a user' logic
AuthController.signUp = function(req, res){
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.address){
        res.json({message: 'Please provide complete information before submit.'});
    } else{
        db.sync().then(function(){
            var newUser = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password:req.body.password,
                address: req.body.address
            };

            User.create(newUser).then(
                ()=>{res.status(201).json({message: 'Account created!'})},
                (error)=>{res.status(403).json({message: 'Email already exists!'})}
            );
        })
    }
}


// implement the 'user login' logic
AuthController.authenticateUser = function(req, res){
    if(!req.body.email || !req.body.password){
        res.status(404).json({message: 'Email and password are needed!'});
    } else{
        var email = req.body.email,
            password = req.body.password;
        
        User.findOne({where: {email: email}}).then(function(user){
            if(!user){
                res.status(404).json({message: 'Authentication failed! User does not exist!'});
            }else{
                user.comparePasswords(password, (error, result)=>{
                    if(error){
                        res.status(500).json({message: 'An error happened casusing login failure!'});
                    }else if(!result){
                        res.status(401).json({message: 'Authentication failed! Password is incorrect!'});
                    }else{
                        // the generated token is a string
                        var token = jwt.sign(
                            {email: user.email}, // this line is the payload
                            config.keys.secret,
                            {expiresIn: '30m'}
                        );
                        res.json({success: true, token: 'JWT' + token});
                    }
                })
            }
        }).catch((error)=>{res.status(500).json({message: 'There is an error!'})});       
    }
}


module.exports = AuthController