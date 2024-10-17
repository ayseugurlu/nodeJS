'use strict'

/*----------------------------*/ 

// require('./modules/index.js')
// require('./modules/index')
//  require('./modules')

 //! yukardaki sekillerde import edebiliriz dosya adi index oldugundan 3. secenekteki gibi dosya adini yazmasak bile oluyor. index default cünkü

 /* ----------------------------*/

//  const test = require('./modules')

//  test()


 /*------------------------*/

// const arrFunc = require ('./modules/index')

// arrFunc[0]()
// arrFunc[1]()
// arrFunc[2]()


 /*------------------------*/

// const [test1, test2, test3] = require('./modules/index')
// test1()
// test2()
// test3()


 /*-------------------------*/
const objFunc =  require('./modules/index')

objFunc.test1()
objFunc.test2()
objFunc.test3()


 /*-----------------------------*/

 const {test1,test2, test3} = require('./modules/index') //objelerde destruct ederken sira önemli degildir
 
 test1()
 test2()
 test3()

 /*-------------------------------*/

console.log('this is module.js');
