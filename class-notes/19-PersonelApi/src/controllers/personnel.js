"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */


const Personnel = require('../models/personnel')

module.exports = {
    list: async (req, res) => {
        const result = await res.getModelList(Personnel);

        res.status(200).send({
            error: false,
            result,
            detail: await res.getModelListDetails(Personnel),
        });
    },

    create: async (req, res) => {
        const result = await Personnel.create(req.body);
        res.status(201).send({
            error: false,
            result,
        });
    },

    read: async (req, res) => {
        const result = await Personnel.findOne({ _id: req.params.id });

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
        const result = await Personnel.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true, //validate islemini update de de calissin diye bunu true yapariuz 
        });

        res.status(202).send({
            error: false,
            result,
            new: await Personnel.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {
        const result = await Personnel.deleteOne({ _id: req.params.id });
        res.status(result.deletedCount ? 204 : 404).send({
            error: !result.deletedCount,
            result,
        });
    },

};