"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/product:

const product = require('../controllers/product')
const permissions = require('../middlewares/permissions')

// URL: /products

router.route('/')
    .get(permissions.isStaff, product.list)
    .post(permissions.isAdmin, product.create)

router.route('/:id')
    .get(permissions.isStaff, product.read)
    .put(permissions.isAdmin, product.update)
    .patch(permissions.isAdmin, product.update)
    .delete(permissions.isAdmin, product.delete)

/* ------------------------------------------------------- */
module.exports = router