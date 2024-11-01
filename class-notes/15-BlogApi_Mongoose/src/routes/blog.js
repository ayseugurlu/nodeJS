'use strict'

const router = require('express').Router()

// controller

const {blogCategory,blogPost} = require('../controllers/blog')

router.route('/category')
    .post(blogCategory.create)


module.exports = router