"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const {Schema, model} = require('mongoose')

const passwordEncrypt = require('../helpers/passwordEncrypt')
const { validate } = require('./department')

const PersonnelSchema = new Schema({
    departmentId:{
        type:Schema.Types.ObjectId,
        ref:'Department',
        required:true
    },
    username:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true,
        set: (password) => passwordEncrypt(password)
    },
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate: [(email) => email.includes('@') && email.includes('.') , "Email is not valid" ]

    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    salary:{
        type:Number,
        default:0
       
    },
    description:{
        type:String,
        trim:true,
        default:null
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isLead:{
        type:Boolean,
        default:false
    },
    startedAt:{
        type:Date,
        default:Date.now()
    }

},{
    collection: "personnels",
    timestamps: true
})

/* ------------------------------------------------------- */

module.exports = model("Personnel", PersonnelSchema)