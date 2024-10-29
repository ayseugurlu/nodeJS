'use strict'

//* Routes

const router =require("express").Router()

//*Controllers
const {list,create,read,update,delete:deleteTodo}= require('../controllers/todo')
// const todo = require('../controllers/todo')

//* CRUD todo

// create todo

// router.post('/todo', create )

//Read Todo

// router.get('/todo/:id', read)

//list todo

// router.get('/todo', list )

// update todo
// router.put('/todo/:id',update)

//delete todo

// router.delete('/todo/:id', deleteTodo)

/*------------------------------------------*/

router.route('/todo')
.get(list)
.post(create)

router.route('todo/:id')
.get(read) 
.put(update)
.delete(deleteTodo)

module.exports = router