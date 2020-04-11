// console.log(__dirname+'aaa')
var bcrypt = require('bcrypt')


var f = params => ({foo: 'bar'})
console.log(f())  // { foo: 'bar' }
console.log(f().foo) // bar

var s = 'abc'
// console.log(typeof(s)) 
// s is a string, but every variable in JS is a object, so we can 
console.log(s.split('b'))



function eat(food1, food2)
{
    console.log("I like to eat " + food1 + " and " + food2 );
}
function myFunc(callback, args)
{
    console.log('this is execution of myfunc!')
    callback.apply(this, args);
}

//alerts "I like to eat pickles and peanut butter"
myFunc(eat, ["pickles", "peanut butter"]); 

function f1(){
    console.log('f1 executing');
    return 'f1 is done'
}

function f2(a){
    console.log(a, 'then f2 executing')
}

f2(f1());

var fruits = ['apple', 'cherry', 'watermelon'];

var func1 = (element, index) => console.log(index, element);
fruits.forEach(func1);  // call func1 3 times


var f3_ = function f3(){
    console.log('This is f3')
};
f3_();



// write a function & handle errors with callbacks
// we define 'what is an error.' by ourseves.
function sum(a, b, callback){
    if(typeof(a) == 'number' && typeof(b) == 'number'){
        var c = a + b;
        callback(null, c); // control the input structure
    }
    else{
        callback('Cannot handle calculation: input type ' + typeof(a) + ' ' + typeof(b) + ' are wrong!')
    }
}

function myCallback(errorMessage, result){
    if(errorMessage){
        // console.error(errorMessage);
        return console.error(errorMessage);  // add 'return' to avoid $$$ being executed
    }
    console.log('the sum is:', result) // $$$
}
sum(3, 6, myCallback);



// var s2 = null
// error handling with promise object
// attach two callbacks, but one and only one will be invoked
// s2 = bcrypt.hash(s1, 10).then(f11, f12)
// s2 = bcrypt.hash(s1, 10).then(f11) // f11 will be executed, as hash() gets executed successfully
// s2 = bcrypt.hash(s1).then(null, f12) // f12 will be executed
// s2 = bcrypt.hash(s1).then(f11, null) // Error thrown by Node
// s2 = bcrypt.hash(s1).catch(f12) // .catch() only get executed when hash() has error.

// error handling with callbacks
// s2 = bcrypt.hash(s1, 10, f13)

// bcrypt.hash(s1, 10).finally(f11) // no argument is passed into f11() by finally()
// bcrypt.hash(s1).finally(f11) // no no argument is passed into f11() by finally()
// bcrypt.hash(s1).finally(f14) // no matter hash() is successfully executed, f14() will always be invoked

//callback-1
function f11(hashedCode) {
    console.log("Hashing successfult with code " + hashedCode);
}
// callback-2
function f12(errorMessage) {
    console.log("Not hashed: " + errorMessage);
}

// callback-3
function f13(errorMessage, hashedCode){
    if(errorMessage){
        return console.log("Not hashed: " + errorMessage);
    }
    console.log("Hashing successfult with code " + hashedCode);
}

function f14(){
    console.log('hahahahaha')
}



var myPassword = 'hanlei9876'

/*
bcrypt.hash(myPassword, 10, (error, hashed)=>{
    console.log('hashed is: ' + hashed);
})*/
// var myHashedCode = bcrypt.hash(myPassword, 10); // return Promise { <pending> }
var myHashedCode = bcrypt.hash(myPassword, 10).then(
    (hashed)=>{
        console.log('hashed is: ' + hashed);
    }
); 
console.log(myHashedCode);

var shit = '$2b$10$FyEZVMOcqu6sIEBmG78PL.gZwoLQeEPpgKyf9puFsfxf4PkDBTc2.'
/*
bcrypt.compare(myPassword, shit, (error, result)=>{
    console.log(result);
});
*/

var path = require('path');
console.log(__dirname);
