"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const {create,list,read,update,delete:deletePersonnel} =require('../controllers/personnel')

// URL : /personnels

router.route('/')
    .get(list)
    .post(create)

router.route('/:id')
    .get(read)
    .put(update)
    .patch(update)
    .delete(deletePersonnel)

/* ------------------------------------------------------- */
module.exports = router