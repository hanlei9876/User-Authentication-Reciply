var express = require('express')
var app = express()

// custom middleware (function)
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

// load the middleware
app.use(myLogger)

app.get('/', (req, res) => {
    console.log(req.body)
    res.send('Nice meeting you, I am Leyton from Express app')
});


app.listen(3001, () => {
    console.log('app is listening on port!');
})