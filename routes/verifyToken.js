const jwt = require('jsonwebtoken')

const KEY= 'wn8723yhufbvjeni23>"{+:983u9io19:">0jei(*&^%$dwnefi2981ijdw'

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, KEY);
        req.user = verified;
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}





