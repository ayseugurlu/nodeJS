'use strict'

/*
                ExpressJs
*/


/*
    npm init -y
    npm i express dotenv
*/

// ? Express server start

const express = require('express')
const app = express()  // express üzerinde server calistir

// dotenv
require('dotenv').config() //dotenv deki tüm degiskenler process env ye alinir
// console.log(process.env);

const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || '127.0.0.1'

// req and res short form request and response
// app.get('/',(req,res)=>{

// //1
//     // res.write('hello ')
//     // res.write('clarusway')
//     // res.end()

// //2
//     // res.write(JSON.stringify({ //objeyi direk render edemez . o yüzden json a cevirmek gerekir
//     //     message:'clarusway'
//     // }))

//     // res.end()

// //3
//     res.send({
//         message:'clarusway'
//     })

//     // send obje dönüsümünü yapar end i de icerir b u yüzden end yazmayiz. bundan bir tane send olur

// })

// app.get('/' , (req,res)=> { res.send('method GET') })
// app.post('/' , (req,res)=> { res.send('method POST') })
// app.put('/' , (req,res)=> { res.send('method PUT') }) //PUT = PATCH
// app.patch('/' , (req,res)=> { res.send('method PATCH') }) //PATCH = PUT
// app.delete('/' , (req,res)=> { res.send('method DELETE') })
// app.all('/', (req,res)=> { res.send('method ALL') })  //tavsiye edilmez


// app.get('/abc' , (req,res)=> { res.send('method GET') })
//app.get('/abc(x?)123' , (req,res)=> { res.send('method GET') }) //aradaki x geledebilir gelmeyedebilir
//app.get('/abc(x+)123' , (req,res)=> { res.send('method GET') }) // n adet x alabilir
// app.get('/abc(*)123' , (req,res)=> { res.send('method GET') }) //arada ne olursa olsun

// https://regexr.com/

// app.get(/abc/ , (req,res)=> { res.send('method GET') })  // tek tirnaklar yok iki / arasibnda , abc icerirse
// app.get(/abc$/ , (req,res)=> { res.send('method GET') })  // abc önüne ne gelirse gelsin
// app.get(/^\abc$/ , (req,res)=> { res.send('method GET') }) // abc sonuna ne gelirse gelsin

//? URL parametre

// app.get('/user/:userId/:name', (req,res) => {
//     res.send( {
//          url:{
//             protocol: req.protocol,
//             secure:req.secure,
//             hostname:req.hostname,
//             subdomain:req.subdomains,
//             url:req.url,
//             originalURL:req.originalUrl, // hangi router da isek one verir ilerde bakilacak
//             params:req.params,
//             method:req.method,
//             query:req.query

//         },
//         id:req.params.userId
//     }
       
//     )
// })

//* parametreler icin reregex kullanabilirsiniz

//  /user/:userId([0-9])/:name   userId sadece rakamalardan olussun

//? STATUS CODES

//default status code 200
// app.get('/', (req,res) =>{
//     // res.sendStatus(404)
//      res.status(404).send({message:'hello'})
//     //  res.send(200,{message:'hello'}) // tedavulden kalkmis

    

// })
/*
app.get('/', (req,res) =>{res.status(200).send({message:'ok'})})
app.post('/', (req,res) =>{res.status(201).send({message:'ok'})})
app.put('/', (req,res) =>{res.status(202).send({message:'ok'})})
app.delete('/', (req,res) =>{res.status(202).send({message:'ok'})})
*/


//?download
//get istegi geldiginde app.js dosyasini indir
// app.get('/download', (req,res) =>{res.download('./app.js')})
app.get('/download', (req,res) =>{res.download('./app.js','newname.js')}) //app.js dosyasini newname.js olarak kaydeder


//? show file content

// app.get('/show' ,(req,res) => {res.sendFile(__dirname + '/app.js')}) //tam dosya yolu lazim __dirname onu yazar


//? redirect

// app.get('/kalici', (req,res)=> { res.redirect(301, 'https://www.clarusway.com')}) // yönlendirmeyi cache kaydeder
// app.get('/gecici', (req,res)=> { res.redirect(302, 'https://www.clarusway.com/courses')}) //cache e kaydetmez


app.get('/', (req,res) =>{res.status(200).send({message:'ok'})})
// app.listen(8000)

// app.listen(8000, () => console.log('server running'))

// app.listen(PORT, () => console.log('server running on http://127.0.0.1'))

app.listen(PORT, () => console.log(`server running on http://${HOST}:${PORT}`))





