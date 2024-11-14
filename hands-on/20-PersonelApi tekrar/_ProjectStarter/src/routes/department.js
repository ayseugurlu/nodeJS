"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()

const {list,create,read,update,delete:deleteDepartment} = require('../controllers/department')
/* ------------------------------------------------------- */

router.route('/')
    .get(list)
    .post(create)

router.route('/:id')
    .get(read)
    .put(update)
    .patch(update)
    .delete(deleteDepartment)

/* ------------------------------------------------------- */
module.exports = router