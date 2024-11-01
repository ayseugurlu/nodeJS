'use strict'

//mongoose
const mongoose = require('mongoose')

// const SchemaName = new mongoose.Schema({...field},{...mongoose.settings})

/*

const SchemaName = new mongoose.Schema({
    // _id: ObjectId //hexedecimal format id

    fieldName:{
        type: Number,
        default:null, //if value not send
        trim:true,
        unique:true,
       // required:true,
       required:[true,'This required fieldname'],
       index:true, //to access data faster 
    //    enum:[1,2,3]
    // enum:["1","2","3"]
        enum:[["1","2","3"],'this is enum err msg'],
        validate:[
            (data)=> {return true},
            'this is validate err msg'
        ],
        get: (data) =>data, //auto runs -to get the data from db
        set: (data) =>data, //auto runs -to save the data to db

    }
},{
    collection: 'tableName',
    timestamps: true, //auto add createdAt and updatedAt fields
})

*/

/*---------------------------------------------------------------------*/
//Blog Category Schema
const BlogCategorySchema = new mongoose.Schema({
    //_id auto come
    name:{
        type:String,
        trim:true,
        required:true,
    }
},{
    collection: 'blogCategories',
    timestamps:true
})

// const BlogCategory = mongoose.model('BlogCategory',BlogCategorySchema)

// Blog Post Schema
const BlogPostSchema = new mongoose.Schema({
    categoryId:{ //Default relation is many-to-one
        ref:'BlogCategory',
        required:true,
        type: mongoose.Schema.Types.ObjectId
    
    },
    title:{type:String,
    trim:true,
    required:true,
    },
    content:{
        type:String,
        trim:true,
        required:true,
    },


},{
    collection: 'blogPosts',
    timestamps:true
})

// const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

// module.exports = {
//     BlogCategory,
//     BlogPost
// }

module.exports = {
    
    BlogCategory : mongoose.model('BlogCategory',BlogCategorySchema),
    BlogPost : mongoose.model('BlogPost', BlogPostSchema),
}