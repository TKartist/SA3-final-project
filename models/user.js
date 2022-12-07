const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String, require:true, unique: true
    },
    username: {
        type: String, require:true, unique: true
    },
    password_crypt: {
        type: String, require:true
    }
}, {collection: 'data-users'})


const model = mongoose.model('UserSchema', UserSchema)

module.exports = model