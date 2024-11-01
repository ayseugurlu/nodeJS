'use strict'

const {BlogCategory, BlogPost} = require('../models/blog')

//blogCategory
module.exports.blogCategory = {
    list: async(req,res) => {

    },
    create: async(req,res) => {
        const result = await BlogCategory.create(req.body)
        res.status(201).send(({
            error:false,
            result
        }))
    },
    read: async(req,res) => {

    },
    update: async(req,res) => {

    },
    delete: async(req,res) => {

    },
   
    
}




/*---------------------------------------------------------------*/
//blogPost controller
module.exports.blogPost = {

}