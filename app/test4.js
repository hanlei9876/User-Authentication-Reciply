'use strict'

const express = require('express')

const app = express() // the main app
const admin = express() // the sub app

admin.get('/', function (req, res) {
  console.log(admin.mountpath) // /admin
  res.send('This is my Admin Homepage')
})

app.use('/admin', admin) // mount the sub app

const port = 3000
app.listen(port, () => {
    console.log('app is listening on port ' + port + '!');
})