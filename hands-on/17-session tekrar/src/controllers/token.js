'use strict'

const Token = require('../models/token')

module.exports ={
    list: async (req,res) => {
        console.log(res);
        const result = await res.getModelList(Token)

        res.status(200).send({
            error:false,
            detail:await res.getModelListDetails(Token),
            result
        })
    },
    create: async (req,res) => {


        res.status().send({})
    },
    read: async (req,res) => {


        res.status().send({})
    },
    update: async (req,res) => {


        res.status().send({})
    },
    delete: async (req,res) => {


        res.status().send({})
    },
}