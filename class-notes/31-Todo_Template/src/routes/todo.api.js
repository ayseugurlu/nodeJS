"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
/*------------------------------------------------------- */

// const express = require("express")
// const todo = require('../controllers/todo')

const router = require("express").Router()
// Contorollers
const { list, create, read, update, delete: deleteTodo } = require('../controllers/todo.api')


router.route('/todo')
    .get(list)
    .post(create)

router.route('/todo/:id')
    .get(read)
    .put(update)
    .delete(deleteTodo)

module.exports = router