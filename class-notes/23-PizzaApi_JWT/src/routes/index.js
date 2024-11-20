'use strict'

const router = require('express').Router()

//Router index:

//URL : 


// Auth:
router.use('/auth', require('./auth'))
// Tokens:
router.use('/tokens', require('./token'))

// Users:
router.use('/users', require('./user'))
// Toppings:
router.use('/toppings', require('./topping'))
// Pizza:
router.use('/pizzas', require('./pizza'))
// Order:
router.use('/orders', require('./order'))

// Documents:
router.use('/documents', require('./document'))


module.exports = router