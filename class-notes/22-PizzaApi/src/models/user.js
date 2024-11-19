"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')

const passwordEncrypt = require('../helpers/passwordEncrypt')
/* ------------------------------------------------------- */

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        set: (password)=> passwordEncrypt(password),
        // validate: (password) => return true  // we will do this validation in controller
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate: [
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        "Please fill a valid email address",
      ],
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

    },{
    collection:'users',
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)