"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
//Model
const Todo = require('../models/todo')

module.exports = {
    list: async (req, res) => {

        // const result = await Todo.findAll()
        const result = await Todo.findAndCountAll()

        res.status(200).send({
            error: false,
            result
        })
    },

    create: async (req, res) => {

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
    },

    read: async (req, res) => {

        // const result = await Todo.findOne({ where: { id: req.params.id } })
        const result = await Todo.findByPk(req.params.id)


        res.status(200).send({
            error: false,
            result
        })

    },

    update: async (req, res) => {

        // const result = await Todo.update({...newData},{...filter})
        const result = await Todo.update(req.body, { where: { id: req.params.id } })

        const isUpated = result[0]

        res.status(isUpated ? 202 : 404).send({
            error: isUpated ? false : true,
            message: isUpated ? "Updated" : "Something went wrong!",
            updatedData: isUpated && await Todo.findByPk(req.params.id)
        })
    },

    delete: async (req, res) => {

        const isDeleted = await Todo.destroy({ where: { id: req.params.id } })

        if (isDeleted) {
            res.sendStatus(204)
        } else {
            res.errorStatusCode = 404
            throw new Error('Can not deleted! or Maybe already deleted.')
        }

    }
};