const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const MovesSchema = new mongoose.Schema({
    map: {
        type: String
    },
    atk: {
        type: String
    },
    object : {
        type: String
    },
    id : {
        type: ObjectId
    }
}, {collection: 'moves'})


const model = mongoose.model('MovesSchema', MovesSchema)

module.exports = model