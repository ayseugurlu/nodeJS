'use strict'

const {Schema ,model} = require('mongoose')

//token model
const TokenSchema = new Schema({

    userId:{
        type: Schema.Types.ObjectId,
        ref:"Personnel",
        required: true,
        index:true
    },
    token:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        index:true
    }
},{
    collection:'tokens',
    timestamps:true
}) 

module.exports = model('Token', TokenSchema)