"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Token = require('../models/token')


module.exports = {
    list: async (req, res) => {
        const result = await res.getModelList(Token);

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Token),
            result,
        });
    },

    create: async (req, res) => {
        const result = await Token.create(req.body);
        res.status(201).send({
            error: false,
            result,
        });
    },

    read: async (req, res) => {
        const result = await Token.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            result,
        });
    },

    //filter, update,options
    // const options = { upsert: true };
    // acknowledged: İşlemin MongoDB tarafından tanındığını gösterir.
    // matchedCount: Filtre kriterleriyle eşleşen belge sayısını belirtir.
    // modifiedCount: Güncellenen belge sayısını belirtir.
    // upsertedId: Eğer upsert kullanıldıysa ve yeni bir belge oluşturulduysa, bu belgenin _id değeri burada yer alır.
    // upsertedCount: upsert işlemi ile kaç belgenin oluşturulduğunu belirtir.

    update: async (req, res) => {
        const result = await Token.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });

        res.status(202).send({
            error: false,
            result,
            new: await Token.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {
        const result = await Token.deleteOne({ _id: req.params.id });
        res.status(result.deletedCount ? 204 : 404).send({
            error: !result.deletedCount,
            result,
        });
    },


};