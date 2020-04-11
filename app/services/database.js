// locates at Reciply_User_Auth/app/services/databse.js
// this file is especially designed for interacting with 'sequelize'

'use strict'

var config = require('./../config')
var Sequelize = require('sequelize')

// instantiate before using 'sequelize'
module.exports = new Sequelize(
    config.db.db_name,
    config.db.user,
    config.db.password,
    config.db.details
)