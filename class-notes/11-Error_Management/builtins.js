'use strict'


const { error } = require('console')
/*-----------------------------
      Built in Middlewares in ExpressJS
------------------------------*/


const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 8000

/*----------------------------------*/
//*Receiving Data

//^ Parse data which is coming in body from json
app.use(express.json())

//^ Parse data which is coming in text from json
app.use(express.text())

//^ Parse data which is coming in Form-encoded 
app.use(express.urlencoded())




app.all('/:id',(req,res)=>{

    const {params,query,body,headers} =req
    res.send({
        error:false,
        params,
        query,
        body,
        headers


    })
})

app.use('/public',express.static('./images'))


app.listen(PORT, ()=>console.log(`Running at : http://127.0.0.1:${PORT}`))