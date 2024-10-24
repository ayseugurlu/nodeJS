'use strict'

/*-----------------------------
      Error Handling in NodeJS
------------------------------*/

/*
npm init -y
npm i express dotenv 
echo PORT=8000 > .env
cat > .gitignore (kopyalanan verileri terminale yapistir ardindan ctrl+c ile cikis yap)
*/

const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 8000

/*---------------------------*/

// app.get('/user/:id', (req,res) => {

//     const {id} = req.params

//     if(isNaN(id)){
//         res.errorStatusCode = 400
//         throw new Error('ID is not a number',{cause:'hata paramsdan gelen id den olustur'})
//     }else{

//     res.send({
//         error:false,
//         message:'hi there',
//         id //id:id
//     })
//     }
    
// })


/*------------------------*/

//? TRY-CATCH
//tercih edilmez

// app.get('/user/:id', (req,res) => {

//     const {id} = req.params

//     try {
//           if(isNaN(id)){
//         res.errorStatusCode = 400
//         throw new Error('ID is not a number',{cause:'hata paramsdan gelen id den olustur'})
//     }else{

//     res.send({
//         error:false,
//         message:'hi there',
//         id //id:id
//     })
//     }

//     } catch (error) {

//         const statusCode = res?.errorStatusCode ?? 500
//         res.status(statusCode).send({
//             error:true,
//             message: error.message,
//             cause:error.cause,
//             name:res.name
    
//         })
//        next(error)
//     }

  
    
// })


/*------------------------------------*/

//? async

// const asyncFunction =async () =>{
//     throw new Error('This error message is from async function!', {cause:'this is async cause message'})

// }

// app.get('/async' , async(req,res,next)=>{
//     await asyncFunction()
//     .catch(next) //Send the error to  -> Error Handler
   

//     res.send({
//         error:false,
//         msg:'Ali is well'
//     })
    
// })

/*--------------------------------------*/

//? express-async-errors

require('express-async-errors')

app.get('/async', async (req, res, next) => {
    res.errorStatusCode = 400
    throw new Error('Created error in async-func')
})






const errorHandler = (error,req,res,next) => {
   
const statusCode = res?.errorStatusCode ?? 500

    res.status(statusCode).send({
        error:true,
        message: error.message,
        cause:error.cause,
        stack:error.stack

    })
}

app.use(errorHandler)





/*----------------------------------------*/

app.listen(PORT, ()=>console.log(`Running at : http://127.0.0.1:${PORT}`))

