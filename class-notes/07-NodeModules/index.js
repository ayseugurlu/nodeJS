"use strict"
/* -------------------------------------------- *
                       DOTENV
/* -------------------------------------------- */

// for windows 
// "start": "set HOST=localhost&& set PORT=8000&& node index"

// for Linux and macOS
// "start": "HOST=localhost PORT=8000 node index"

console.log('this is indexjs');

/*-----------------------------------*/

require('dotenv').config()


console.log(process.env.PORT);
console.log(process.env.HOST);