
var config = require('./../config');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

/*
console.log(
    config.db.db_name,
    config.db.user,
    config.db.password,
    config.db.details
)*/

var sequelize = new Sequelize(  // a connection
    'test_db',
    config.db.user,
    config.db.password,
    config.db.details
);

modelAttributes = {
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
    },
    hashedPassword: {
        type: Sequelize.STRING
    }
}


var modelOptions = {
    timestamps: false,
    hooks: {
        beforeValidate: hashPassword
    }
};

function hashPassword(user){
    return bcrypt.hash(user.password, 10).then((hashcode)=>{
        console.log('hook happens at user', user.name, 'password:', user.password);
        user.hashedPassword = hashcode;
    });
}

var UserModel = sequelize.define('User', modelAttributes, modelOptions);
// console.log(UserModel === sequelize.models.User)

UserModel.prototype.comparePassword = function (password, callback){
    bcrypt.compare(password, this.hashedPassword, (error, result)=>{
        if(error){
            return callback(error);
        }
        return callback(null, result);
    })
}; // add semi-colon




// create a table 'Users' in the databse using SQL statements
(async ()=>{
    await UserModel.sync({force: true}).then(
        (reults) => {console.log('table - User created successfully:', reults);},
        (error) => {console.error('Unable to create table - User', error);});
    
    var leyton = UserModel.build({name: 'Leyton'});
    // console.log('checkpoint-1:', leyton.changed('password')) // false
    await leyton.save(); // hook is happening here! 
    // console.log('checkpoint-2:', leyton.changed('password')) // false

    leyton.password = 'hhhhhhh';
    // console.log('checkpoint-3:', leyton.changed('password')) // true
    await leyton.save();
    // console.log('checkpoint-4:', leyton.changed('password')) // true

    var yixiao = await UserModel.create({
        name: 'Yixiao', 
        favoriteColor: 'purple', 
        age: 18,
        password: '12345'
    }) // hook is happening here!
    // console.log(yixiao.toJSON())

    
    
    // leyton.age = 20
    // await leyton.save()  // .save() is an async function

    // console.log(leyton.age)
    // await leyton.increment('age', {by: 30})
    // await leyton.reload()
    // console.log(leyton.age)

    await yixiao.comparePassword('1234', (error, result)=>{
        if(error) return console.error('an mistake happened:', error);
        console.log('the result of comparision is:', result);
    });
    
})();



/*  xxxxxxxx
UserModel.drop((error, result)=>{
    if(error) {return console.log("Can't drop table: ", error);}
    return console.log("User table dropped!");
});*/
/*
UserModel.drop().then(
    (result) => {console.log("User table dropped!");},
    (error)=>{console.log("Can't drop table: ", error);}
);*/
    




/* 
sequelize.authenticate().then(
    (reults) => {console.log('Connection has been established successfully. // ' + reults);},
    (error) => {console.error('Unable to connect to the database:', error);}
);

sequelize.close().then(
    (reults) => {console.log('close connection successfully, ' + reults);},
    (error) => {console.error('Unable to close connection:', error);}
);*/


/*
async function run() {
    await sequelize.authenticate().then(
        (reults) => {console.log('Connection has been established successfully. // ' + reults);},
        (error) => {console.error('Unable to connect to the database:', error);}
    );
    
    await sequelize.close().then(
        (reults) => {console.log('close connection successfully, ' + reults);},
        (error) => {console.error('Unable to close connection:', error);}
    );
}
run().catch(error=>console.log(error));
*/