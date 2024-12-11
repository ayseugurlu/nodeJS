"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const DB_PATH = process.env.DB_PATH || './db.sqlite3';
const DB_NAME = process.env.DB_NAME || 'sqlite';

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


module.exports = Todo
