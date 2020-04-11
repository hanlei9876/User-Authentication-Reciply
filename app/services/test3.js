'use strict'

var config = require('./../config');
var {Sequelize, Model} = require('sequelize');
var bcrypt = require('bcrypt');

// create a connection
var sequelize = new Sequelize(  
    'test_db',
    config.db.user,
    config.db.password,
    config.db.details
);

class UserModel extends Model {}
// console.log('the password of '+ this.name + ' is ' +this.password)

var modelAttributes = {
    name: {
        type: Sequelize.TEXT,
        defaultValue: 'Michael'
    },
    favoriteColor:{
        type: Sequelize.TEXT,
        defaultValue: 'green'
    },
    age: Sequelize.INTEGER,
    password: {
        type: Sequelize.STRING,
        defaultValue: 'hanlei9876'
    }
}

UserModel.init(modelAttributes, {
    sequelize,
    modelName: 'User',
    timestamps: false
})
// console.log(UserModel === sequelize.models.User)



// create a table 'Users' in the databse
(async ()=>{
    await UserModel.sync({force: true}).then(
        (reults) => {console.log('table - User created successfully:', reults);},
        (error) => {console.error('Unable to create table - User', error);});
    
})();
