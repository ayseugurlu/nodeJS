'use strict'

/* ----------------------*
     NodeJs Server
/*-------------------------*/

require('dotenv').config()



const PORT = process.env.PORT
const HOST =process.env.HOST

//HTTP server
const http = require('node:http')  //bulit in module

/*------------------------*/

// http.createServer((request,response)=> {...})

// const app = http.createServer((request,response)=> {

//     response.end('hello world response end')
//     console.log('hello world from console');
// })


// //default server domain (local domain) => localhost:127.0.0.1
// app.listen(PORT, () => console.log(`Server is running at : http://${HOST}:${PORT}`))



/*-------------------------------------*/

// http.createServer((req,res)=> {

//     // console.log(req);
//     // console.log(res);
//     console.log(req.url);


//     if(req.url == '/'){
//         res.end('<h1>Home Page</h1>')
//     }else if(req.url == '/about'){
//         res.end('<h1>About</h1>')
//     }else{
//         res.end('<h1>this is any page</h1>')
//     }

//     res.end()

   
// }).listen(PORT, () => console.log(`Server is running at : http://${HOST}:${PORT}`))



/*----------------------------------------------*/

http.createServer((req,res)=> {

    // res.write('<h1>this is  write --1</h1>')
    // res.write('<h1>this is  write --2</h1>')
    // res.write('<h1>this is  write --3</h1>')
    // res.write('<h1>this is write --4</h1>')

    if(req.method == 'GET'){

         //setHeader (single header method)

    res.setHeader('title', 'value')

    //writeHead (statuscode, statusmessage, {multi headers})

    res.writeHead(200, {
        'content-encoding' : 'utf-8',
        'multi-headers-exp' : 'test header value'
    })

    console.log(req);

    const obj = {
        result:true,
        message:'hello world',

    }

    
    res.write(JSON.stringify(obj))
    res.end()

    }else{
        res.writeHead(400)
        res.end('wrong method')
    }

   
}).listen(PORT, () => console.log(`Server is running at : http://${HOST}:${PORT}`))
