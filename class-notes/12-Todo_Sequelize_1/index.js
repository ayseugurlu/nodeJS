"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require('express-async-errors')
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const DB_PATH = process.env.DB_PATH || './db.sqlite3';
const DB_NAME = process.env.DB_NAME || './db.sqlite3';

/* ------------------------------------------------------- */
// Parse json data:
app.use(express.json())

app.all('/', (req, res) => {
    res.send('WELCOME TO TODO API')
})

/* ------------------------------------------------------- */
// Sequlize
const { Sequelize, DataTypes } = require('sequelize')

// Creating new instance 
const sequelize = new Sequelize(`${DB_NAME}:${DB_PATH}`) // define your db and the path

//* Creating Model
// sequelize.define('modelName', { fields })
const Todo = sequelize.define('todos', {

    /*  id: { // this att. created auto
            type: DataTypes.INTEGER,
            allowNull: false,  // default : true
            unique: true,  // default : false
            comment: 'this is comment',
            primaryKey: true,  // default : false
            autoIncrement: true,  // default : false
            field: 'custom_name',
            defaultValue: 0  // default : null
        } 
    */

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: DataTypes.TEXT, // shorthand using

    priority: { // -1 : low , 0: Normal , 1: High
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

    // No need to define createdAt and updatedAt. created auto

})

// Sync - JUST EXECUTE ONCE 
// sequelize.sync() // executing model 
// sequelize.sync({ force: true }) // DROP TABLE & CREATE TABLE
// sequelize.sync({ alter: true }) // TO BACKUP & DROP TABLE & CREATE TABLE FROM BACKUP


// COnnecting to DB
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('* DB Not Connected *'))

/* ------------------------------------------------------- */
// Routes and Controllers

const router = express.Router()

// Read Todo:
router.get('/todo', async (req, res) => {

    // const result = await Todo.findAll()
    const result = await Todo.findAndCountAll()

    res.status(200).send({
        error: false,
        result
    })
})

// Creeate Todo:
router.post('/todo', async (req, res) => {

    // await Todo.create({
    //     title: 'Title 1',
    //     description: 'Desription',
    //     priority: 0,
    //     isDone: false
    // })

    const result = await Todo.create(req.body)

    res.status(201).send({
        error: false,
        result
    })
})

// delete - update

app.use(router)


/* ------------------------------------------------------- */
// Error Handler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.errorStatusCode ?? 500
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