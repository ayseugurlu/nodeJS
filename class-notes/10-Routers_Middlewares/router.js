'use strict'

/*
    EXPRESSJS ROUTER
*/
const express=require('express')
const app=express() 

require('dotenv').config()

const PORT=process.env.PORT || 8000
const HOST=process.env.HOST || '127.0.0.1'
/*
app.all('/',(req,res)=>{
    res.send({
        // method:req.method,
        method:'method ALL',
        message:'Hello Clarusway'
    })
})
app.get('/',(req,res)=>{
    res.send({
        method: 'get istegi',
        message:'Hello Clarusway'
    })
})*/
/*
const router=express.Router() // router sadece rourting amaçlı bir app

// oluşan router servera bildirilir
app.use(router)

// router.get('/',(req,res)=>{ res.send ({ message:'GET' })})
// router.get('/user',(req,res)=>{ res.send ({ message:'GET for user path' })})
// router.post('/',(req,res)=>{ res.send ({ message:'POST' })})

//? router.route()

router.route('/')
    .get((req,res)=>{ res.send ({ message:'GET' })})
    .post((req,res)=>{ res.send ({ message:'POST' })})
    .put((req,res)=>{ res.send ({ message:'PUT' })})
    .delete((req,res)=>{ res.send ({ message:'DELETE' })})


router.get('/user',(req,res)=>{ res.send ({ message:'GET for user path' })})
*/
// app.use(require('./routers/index.js'))
// app.use(require('./routers/index'))
app.use(require('./routers'))

app.listen(PORT,()=> console.log(`Server running on http://${HOST}:${PORT}`))
