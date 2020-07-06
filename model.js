const mongoose = require('mongoose')

let Schema = new mongoose.Schema(
    {name: String, description: String, price: Number, links: [String]},
    { timestamps: { createdAt: 'created_at' } }
);

module.exports = Schema;