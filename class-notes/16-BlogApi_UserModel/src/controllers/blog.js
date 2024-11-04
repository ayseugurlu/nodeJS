'use strict'
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const { BlogPost, BlogCategory } = require('../models/blog')

// BLOG CATEGORY SHOULD BE DONE

/* ------------------------------------------------------- */
// blogCategory controllers
module.exports.blogCategory = {
    list: async (req, res) => {

        const result = await BlogCategory.find()

        res.status(200).send({
            error: false,
            result
        })

    },
    create: async (req, res) => {

        const result = await BlogCategory.create(req.body)

        res.status(201).send({
            error: false,
            result
        })

    },
    read: async (req, res) => {
        const {categoryId} = req.params //destruct etmeseydik req.params.categoryId yazacaktik asagiya
        const result = await BlogCategory.findOne({_id:categoryId})

        res.status(200).send({
            error: false,
            result
        })

    },
    update: async (req, res) => {

        /*
        const {modifiedCount} = await BlogCategory.updateOne({_id:req.params.categoryId}, req.body)

        res.status(modifiedCount ? 202 : 404).send({
            // error: !!modifiedCount, // (!!) -> get the boolean value of the data
            error: !modifiedCount,
            new: await BlogCategory.findById(req.params.categoryId)
        })

        */

        //2.yol
            const { categoryId } = req.params
    
            const updatedData = await BlogCategory.findByIdAndUpdate(categoryId, req.body, {
                new: true, // return updated data 
            })
    
            res.status(202).send({
                error: false,
                updatedData
            })
    


    },
    delete: async (req, res) => {
        const {deletedCount} = await BlogCategory.deleteOne({_id:req.params.categoryId})

        // res.status(deletedCount ? 204 : 404).send({
        //     error: !deletedCount,
        // })

        if (deletedCount){res.sendStatus}
        else{throw new Error("Something went wrong")}

    },
}

/* ------------------------------------------------------- */
// blogPost controllers
module.exports.blogPost = {

    list: async (req, res) => {

        const result = await BlogPost.find()

        res.status(200).send({
            error: false,
            result
        })
    },

    create: async (req, res) => {

        const result = await BlogPost.create(req.body)

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {

        const result = await BlogPost.findById(req.params.postId)

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {

        const { postId } = req.params

        const updatedData = await BlogPost.findByIdAndUpdate(postId, req.body, { new: true })

        res.status(202).send({
            error: false,
            updatedData
        })
    },

    delete: async (req, res) => {

        const { deletedCount } = await BlogPost.deleteOne({ _id: req.params.postId })

        if (deletedCount) res.sendStatus(204)
        else throw new Error("Something went wrong!")

    }
}