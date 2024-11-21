"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
*/

const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

 // Cross-origin resource sharing (CORS): $ npm i cors
const cors = require('cors')
const defaultCorsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}
app.use(cors()) 

/* ------------------------------------------------------- */
// Middlewares:

// Parse JSON:
app.use(express.json())

// Logger:
app.use(require('./src/middlewares/logger'))

// Auhentication: (JWT & Simple Token)
app.use(require('./src/middlewares/authentication'))

// findSearchSortPage / res.getModelList:
app.use(require('./src/middlewares/queryHandler'))

/* ------------------------------------------------------- */
// E-MAIL
//npm i nodemailer

const nodemailer = require('nodemailer')

// Create Test Account

// nodemailer.createTestAccount().then((data)=> console.log(data)) // bu bize fake bir mail saglar her kayitta yenisi olusur bu yüzden birini kopyalayip yoruma aldik

/*

{
    user: 'uxiwgcdq2o4brbsp@ethereal.email',
    pass: 'bzq2QbNmUeaCAuCT4W',
    smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
    imap: { host: 'imap.ethereal.email', port: 993, secure: true },
    pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
    web: 'https://ethereal.email',
    mxEnabled: false
  }
  
  */

  /*

  //connect to mail server / smtp
  const transporter = nodemailer.createTransport({
    //SMTP
    host: 'smtp.ethereal.email',
    port:587,
    secure:false,
    auth:{
        user: 'uxiwgcdq2o4brbsp@ethereal.email',
        pass: 'bzq2QbNmUeaCAuCT4W'

    }
  })

//   console.log(transporter);

//Send Mail:

transporter.sendMail({
    from: 'uxiwgcdq2o4brbsp@ethereal.email',
    to: 'aysecelik9135@gmail.com',
    subject: 'Hello from Node.js',
    text: 'Hello there, how are you?',
    html: '<p><b>Hello there</b> <br> How are you? </p>',
},function(error, success){
    success ? console.log('Success', success) : console.log('Error:', error)

})


*/

///* GoogleMail (gmail)
//* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: "alidrl26@gmail.com",
//         pass: 'vbyt klrm hehd xubl'
//     }
// })

//* YandexMail (yandex)
// const transporter = nodemailer.createTransport({
//     service: 'yandex',
//     auth: {
//         user: 'test@yandex.com',
//         pass: '11' // your email-password
//     }
// })

// transporter.sendMail({
//     from: "alidrl26@gmail.com",
//     to: "ktkurt78@gmail.com",
//     subject: "Hello hocam!",
//     text: "Hello there, How are you, how is class going ?",
//     html: '<p> <b> Hello There </b> <br> How are you ? </p>'

// }, function (error, success) {
//     success ? console.log('SUCCESS:', success) : console.log('ERROR:', error)
// })



/* ------------------------------------------------------- */



/* ------------------------------------------------------- */
// Routes:

// All Routes
app.use("/", require('./src/routes'))


// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        docs: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
    })
})

// Staticfile
app.use('/images', express.static('./uploads'))


/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.