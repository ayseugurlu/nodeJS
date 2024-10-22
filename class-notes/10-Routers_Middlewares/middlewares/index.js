'use strict'

/*
    EXPRESSJS MIDDLEWARE
*/
/*
const middleware1= (req,res,next)=>{
    console.log('mid 1');
    next()    
}
const middleware2= (req,res,next)=>{
    console.log('mid 2');
    next()
}
const middleware3= (req,res,next)=>{
    console.log('mid 3');
    next()
}
    */
// module.exports=[middleware1,middleware2,middleware3]
// module.exports={ middleware1, middleware2, middleware3}

module.exports={

    middleware1: (req,res,next)=>{
        console.log('mid 1');
        next()    
    },
    middleware2: (req,res,next)=>{
        console.log('mid 2');
        next()
    },
    middleware3: (req,res,next)=>{
        console.log('mid 3');
        next()
    }

} 