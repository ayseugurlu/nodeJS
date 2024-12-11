"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
/*------------------------------------------------------- */

const router = require("express").Router()
// Contorollers
const { list, create, read, update, delete: deleteTodo } = require('../controllers/todo.view')


// router.route('/')
//     .get(list)
//     .post(create)

router.get('/', list)
router.all('/create', create)

// router.route('/:id')
//     .get(read)
//     .put(update)
//     .delete(deleteTodo)

router.get('/:id', read)

router.all('/:id/update', update)

router.get('/:id/delete', deleteTodo)

module.exports = router