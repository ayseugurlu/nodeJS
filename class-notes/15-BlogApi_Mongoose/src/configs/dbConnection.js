'use strict'

// $ npm i mongoose

const mongoose = require('mongoose')

module.exports = mongoose.connect(process.env.MONGOURI || 'mongodb://localhost:27017/blogAPI')
    .then(()=> console.log('DB connected'))
    .catch(()=> console.log('DB not connected'))

