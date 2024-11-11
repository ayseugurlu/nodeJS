"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const {create,list,read,update,delete:deleteDepartment,personnels} =require('../controllers/department')

// URL : /departments

router.route('/')
    .get(list)
    .post(create)

router.route('/:id')
    .get(read)
    .put(update)
    .patch(update)
    .delete(deleteDepartment)

router.get('/:id/personnels', personnels)

/* ------------------------------------------------------- */
module.exports = router