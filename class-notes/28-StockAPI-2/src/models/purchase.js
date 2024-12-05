"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const PurchaseSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    firmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Firm",
        required: true
    },

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    amount: { // priceTotal
        type: Number,
        set: function () { return this.quantity * this.price }, // does not run if data not sent 
        default: function () { return this.quantity * this.price },// runs on create
        transform: function () { return this.quantity * this.price } // runs on update 
    }
}, {
    timestamps: true,
    collection: 'purchases'
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Purchase', PurchaseSchema)
