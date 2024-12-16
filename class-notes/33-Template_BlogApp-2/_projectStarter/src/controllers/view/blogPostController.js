"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const BlogPost = require("../../models/blogPostModel");
const BlogCategory = require("../../models/blogCategoryModel");

// ------------------------------------------
// BlogPost
// ------------------------------------------

module.exports = {
  list: async (req, res) => {

    // list all published posts
    const data = await res.getModelList(BlogPost, { published: true }, "blogCategoryId");
    // list all categories
    const categories = await BlogCategory.find()
    // List recent 3 posts
    const recentPosts = await BlogPost.find().sort({ createdAt: "desc" }).limit(3)
    // Get page details
    const details = await res.getModelListDetails(BlogPost, { published: true })

    res.render('index', { categories, posts: data, recentPosts, details})
  },

  create: async (req, res) => {
    const data = await BlogPost.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    // req.params.postId
    // const data = await BlogPost.findById(req.params.postId)
    const data = await BlogPost.findOne({ _id: req.params.postId }).populate(
      "blogCategoryId",
    ); // get Primary Data

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    // const data = await BlogPost.findByIdAndUpdate(req.params.postId, req.body, { new: true }) // return new-data
    const data = await BlogPost.updateOne(
      { _id: req.params.postId },
      req.body,
      { runValidators: true },
    );

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await BlogPost.findOne({ _id: req.params.postId }),
    });
  },

  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
