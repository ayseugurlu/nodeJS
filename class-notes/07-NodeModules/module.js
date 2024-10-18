"use strict"
/* -------------------------------------------- *
                    MODULES
/* -------------------------------------------- */
// Dosyayı içe aktarma:

// require('./modules/index.js')
// require('./modules/index')
// require('./modules/') // default file name: index

/* -------------------------------------------- */
// Import from Export

// const test = require('./modules/')
// test()

// require('./modules/')()

/* -------------------------------------------- */

// const arrFunc = require('./modules/')
// // console.log(arrFunc)
// arrFunc[0]()
// arrFunc[1]()
// arrFunc[2]()

// Array Destructuring:
// const [test1, test2, test3] = require('./modules/')
// test1()
// test2()
// test3()

// const objFunc = require('./modules/')
// objFunc.test1()
// objFunc.test2()
// objFunc.test3()

// Object Desctructuring:
const { test1, test3:func3, test2, name } = require('./modules/')
test1()
test2()
func3()
console.log(name)


/* -------------------------------------------- */
/* -------------------------------------------- */
/* -------------------------------------------- */
/* -------------------------------------------- */