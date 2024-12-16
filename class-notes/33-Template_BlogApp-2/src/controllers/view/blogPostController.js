"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const BlogPost = require("../../models/blogPostModel");
const BlogCategory = require("../../models/blogCategoryModel");
const removeQueryParam = require("../../helpers/removeQueryParam");

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
    const recentPosts = await BlogPost.find({ published: true }).sort({ createdAt: "desc" }).limit(3)
    // Get page details
    const details = await res.getModelListDetails(BlogPost, { published: true })

    // req.originalUrl
    // console.log(req.originalUrl);
    let pageUrl = '';
    const queryString = req.originalUrl.split('?')[1];

    if (queryString) {
      pageUrl = removeQueryParam(queryString, 'page')
    }

    pageUrl = pageUrl ? "&" + pageUrl : "";


    res.render('index', { categories, posts: data, recentPosts, details, pageUrl })
  },

  create: async (req, res) => {


    if (req.method == 'POST') {
      req.body.userId = req.session?.user.id
      const data = await BlogPost.create(req.body);
      res.redirect('/blog/post')

    } else {

      const categories = await BlogCategory.find();
      res.render('postForm', { post: null, categories })
    }

  },

  read: async (req, res) => {
    // req.params.postId
    // const data = await BlogPost.findById(req.params.postId)
    const data = await BlogPost.findOne({ _id: req.params.postId }).populate("blogCategoryId"); // get Primary Data

    res.render('postRead', { post: data })

  },

  update: async (req, res) => {
    // const data = await BlogPost.findByIdAndUpdate(req.params.postId, req.body, { new: true }) // return new-data

    if (req.method == 'POST') {

      const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body, { runValidators: true });

      res.redirect('/blog/post')

    } else {

      const post = await BlogPost.findOne({ _id: req.params.postId }).populate("blogCategoryId");
      const categories = await BlogCategory.find();

      res.render('postForm', { post, categories })
    }


  },

  //Todo -> complete this controller
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });

  },
};
