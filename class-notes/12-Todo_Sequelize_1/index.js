"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require('express-async-errors')

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const DB_PATH = process.env.DB_PATH || './db.sqlite3'
const DB_NAME = process.env.DB_NAME || 'sqlite'

/* ------------------------------------------------------- */
// Accept json data:
app.use(express.json())

app.all('/', (req, res) => {
    res.send('WELCOME TO TODO API')
})

//* Sequelize
const {Sequelize, DataTypes}=require('sequelize')

//^ creating new instance
const sequelize = new Sequelize(`${DB_NAME}:${DB_PATH}`) //define your db and the path


//^craeting model
//sequelize.define('modelname', {fields})

const Todo=sequelize.define('todos', {
    /*
    id:{ // this attribute created automatically in sequelize
        type: DataTypes.INTEGER,
        allowNull: false, //default degeri true dur
        unique:true, // default:false
        comment:'this is comment',
        primaryKey:true, // default:false
        autoIncrement: true, // default:false
        field: 'custom name',
        defaultValue:0, //default:null
    }
        */
       title:{
        type: DataTypes.STRING,
        allowNull:false,
       },

       description: DataTypes.TEXT, // shortand using 

       priority:{ // -1:low, 0:normal, 1:high
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue: 0
       },

       isDone:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
       },

       // No need to define createdAt and updateAt . Because created auto

})


// Sync - JUST EXECUTE ONCE  (yani bir kere cxalsitirdiktan sonra yoruma alcaz)

// sequelize.sync() // executing model 
//sequelize.sync({force:true}) //DROP TABLE & CREATE TABLE  (eger force:true dersek önceki tabloda olusturlan verilei siler)
// sequelize.sync({alter:true})   // TO BACKUP & DROP TABLE & CREATE TABLE FROM BACKUP (burda backup aliyor yani kpoyasini olusturyor sonra yeniden onu kllanarak olusturuyor)


//^Connecting to DB
sequelize.authenticate()
    .then(()=>console.log('* DB connected *'))
    .catch(()=>console.log('* DB not connected *'))


//* Routes

const router = express.Router()

//Read Todo

router.get('/todo', async(req,res)=>{
    // const result = await Todo.findAll()
    const result = await Todo.findAndCountAll()

    res.status(200).send({
        error:false,
        result
    })
})


// create todo

router.post('/todo', async(req,res)=>{

// await Todo.create({
//     title:'Title 1',
//     description:'Description',
//     priority:0,
//     isDone:false

// })

    const result = await Todo.create(req.body)

    res.status(201).send({
        error:false,
        result

    })
})


// delete update ödev

app.use(router)



const errorHandler = (err, req, res, next) => {
    const statusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(statusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}
app.use(errorHandler)
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));