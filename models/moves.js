const mongoose = require('mongoose');

const MovesSchema = new mongoose.Schema({
    map: {
        type: String
    },
    atk: {
        type: String
    }
}, {collection: 'moves'})


const model = mongoose.model('MovesSchema', MovesSchema)

module.exports = model