"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// AsyncErrors to errorHandler:
require('express-async-errors')

// Parse json data:
app.use(express.json())
// Accept form data and convert to object:
app.use(express.urlencoded({ extended: true }))

/* ------------------------------------------------------- */
// Templates:
// $ npm i ejs
// https://ejs.co/

app.set('view engine', 'ejs')
// Default template folder is : ./views
app.set('views', './public')


/* ------------------------------------------------------- */
// Routes
app.all('/', (req, res) => {

    // res.render('index');

    res.send(`
        <p><a href="/view"> Todo Template</a></p>
        <p><a href="/api"> Todo RestAPI</a></p>
        `)
})

app.use('/view', require('./src/routes/todo.view'));
app.use('/api', require('./src/routes/todo.api'));

/* ------------------------------------------------------- */
// Error Handler
app.use(require('./src/middlewares/errorHandler'))
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));