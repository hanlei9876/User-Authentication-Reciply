// app/models/user.js
// user model

'use strict'

var Sequelize = require('sequelize')
var bcrypt = require('bcrypt')

var config = require('../config')
var db = require('../services/database')

// prepare parameters being loaded into Sequelize

// 1: Model Schema; - define the the schema of table 'usere' 
// 'username' and 'password' will eventually become two columns in db table
var modelDefinition = {
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },

    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },

    // acting like 'username'
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

// 2: Model Options
// Namings are important here as they are key objects used by Sequelize behind the scenes
// Hooks - callbacks called by Sequelize during specific lifetime events
var modelOptions = {
    timestamps: false,
    hooks: {
        beforeValidate: hashPassword
    }
}

// 3: define the user model
// use our previously defined database service to define User Model
// 'user' will eventually become a table named 'users' in database
var UserModel = db.define('user', modelDefinition, modelOptions);


// add an instance method
UserModel.prototype.comparePasswords = function (password, callback) {
    /*** 
     *Compares two passwords: password as argument and the model's password (this.password)
     *'password' is the plain text, e.g. 'hanlei9876'
     *'this.password' is the hashed code from instance.password (Column 'password' at Table 'user')
     */ 
    bcrypt.compare(password, this.password, function(error, isMatch){
        if(error){
            return callback(error);
        }
        return callback(null, isMatch);
    })
}; // must add 'semi-colon', otherwise, it won't work!


// Hash the password for a user object.
function hashPassword(user) {
    // TODO: Password hashing logic
    // the function will detect any change at the column 'password', incl. nothing -> null, and null -> '123'
    if(user.changed('password')){
        return bcrypt.hash(user.password, 10).then(function(password){
            user.password = password;
        });
    }
}

module.exports = UserModel

