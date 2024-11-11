"use strict"

const Personnel = require("../models/personnel")

/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

module.exports = {
    list: async (req,res) => {
        const result = await res.getModelList(Personnel)

        console.log(result);

        res.status(200).send({
            error:false,
            result,
            detail:await res.getModelListDetails(Personnel)
        })
    },
    create: async (req,res) => {
        const result = await Personnel.create(req.body)

        res.status(201).send({
            error:false,
            result
        })


    },
    read: async (req,res) => {
        const result = await Personnel.findOne({_id:req.params.id})

        res.status(200).send({
            error:false,
            result
        })


    },
    update: async (req,res) => {
        const result = await Personnel.updateOne({_id:req.params.id}, req.body, {
            runValidators:true
        })

        res.status(202).send({
            error:false,
            result,
            new: await Personnel.findOne({ _id: req.params.id})
        })


    },
    delete: async (req,res) => {
        const result = await Personnel.deleteOne({_id:req.params.id})

        res.status(result.deletedCount ? 204 : 404).send({
            error: !result.deletedCount,
            result
        })

    },
   
}