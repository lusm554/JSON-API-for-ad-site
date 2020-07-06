const express = require('express')
const router = express.Router()
const Schema = require('../model')
const ejs = require('ejs')
const mongoose = require('mongoose')
const path = require('path')

let adSchema = mongoose.model('Ads', Schema)

// create new ad
router.get('/newAd', (req, res) => {
    let data = req.query;

    new adSchema(data).save((err, doc) => {
        if(err) {
            res.status(400).send(err);
            throw err;
        }

        res.json({id: doc._id, status: 200});
    })
})

// get all ads
router.get('/ads', async (req, res) => {
    const { page = 1, limit = 10, date = false, price = false} = req.query;

    // sort by created date or by price
    let sortBy = date ? {created_at: date} : price ? {price: price} : {};

    try {
        // execute query with page and limit values
        const posts = await adSchema.find().sort(sortBy)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        let count = await adSchema.countDocuments();

        let path_to_products = path.normalize('./views/products.ejs')

        // return html with ads 
        ejs.renderFile(path_to_products , {products: posts, current: page, pages: Math.ceil(count/limit)}, (err, html) => {
            if(err) {
                res.status(500).send('Server Error');
                return console.error(err)
            }

            res.send(html);
        })
    } catch (err) {
        console.error(err.message);
    }
})

// get default info about ad by id
router.get('/:id', (req, res) => {
    let id = req.params.id;

    adSchema.find({_id: id}, (err, doc) => {
        if(err) {
            res.status(404).send('Not found')
            return console.error(err)
        }
        let {price, name, links} = doc[0];

        res.json({price: price, name: name, link: links[0]});
    })
})

// get more info about ad
router.get('/fields/:id', (req, res) => {
    let id = req.params.id;

    adSchema.find({_id: id}, (err, doc) => {
        if(err) {
            res.status(404).send('Not found')
            return console.error(err)
        }

        res.json(doc);
    })
})

module.exports = router