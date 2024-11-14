"use strict"

const Department = require("../models/department")

/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

module.exports = {
    list: async (req,res) => {
        const result = await res.getModelList(Department)

        console.log(result);

        res.status(200).send({
            error:false,
            result,
            detail:await res.getModelListDetails(Department)
        })
    },
    create: async (req,res) => {
        const result = await Department.create(req.body)

        res.status(201).send({
            error:false,
            result
        })


    },
    read: async (req,res) => {
        const result = await Department.findOne({_id:req.params.id})

        res.status(200).send({
            error:false,
            result
        })


    },
    update: async (req,res) => {
        const result = await Department.updateOne({_id:req.params.id}, req.body, {
            runValidators:true
        })

        res.status(202).send({
            error:false,
            result,
            new: await Department.findOne({ _id: req.params.id})
        })


    },
    delete: async (req,res) => {
        const result = await Department.deleteOne({_id:req.params.id})

        res.status(result.deletedCount ? 204 : 404).send({
            error: !result.deletedCount,
            result
        })

    },
    personnels: async (req,res) => {


    },
}