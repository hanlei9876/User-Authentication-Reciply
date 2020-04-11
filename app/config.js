// application configuration
// locates at Reciply_User_Auth/app/config.js

'use strict'

var config = module.exports

config.db = {
    user: 'root',
    password: 'HANliu1219',
    db_name: 'reciply_db'
}

config.db.details = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
}

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE='
}
