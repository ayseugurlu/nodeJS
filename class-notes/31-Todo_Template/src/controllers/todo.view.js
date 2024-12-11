"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
//Model
const Todo = require('../models/todo')

const PRIORITIES = {
    '-1': 'Low',
    '0': 'Normal',
    '1': 'High'
}

module.exports = {
    list: async (req, res) => {

        // const result = await Todo.findAll()
        const result = await Todo.findAndCountAll()

        res.render('index', { count: result.count, todos: result.rows, priorities: PRIORITIES })
    },

    create: async (req, res) => {

        if (req.method == 'POST') {
            console.log(req.body);
            const result = await Todo.create(req.body)
            res.redirect('/view')
        } else {
            res.render('todoCreate', { priorities: PRIORITIES })
        }

    },

    read: async (req, res) => {

        // const result = await Todo.findOne({ where: { id: req.params.id } })
        const result = await Todo.findByPk(req.params.id)


        res.render('todoRead', { todo: result, priorities: PRIORITIES })

    },

    update: async (req, res) => {

        // const result = await Todo.update({...newData},{...filter})


        if (req.method == 'POST') {
            const result = await Todo.update(req.body, { where: { id: req.params.id } })
            const isUpated = result[0]
            if (isUpated) {
                res.redirect('/view')
            } else {
                throw new Error('Someting went wrong!')
            }

        } else {
            const result = await Todo.findByPk(req.params.id)

            res.render('todoUpdate', { todo: result, priorities: PRIORITIES })
        }



    },

    delete: async (req, res) => {

        const isDeleted = await Todo.destroy({ where: { id: req.params.id } })

        if (isDeleted) {
            res.redirect('/view')
        } else {
            res.errorStatusCode = 404
            throw new Error('Can not deleted! or Maybe already deleted.')
        }

    }
};