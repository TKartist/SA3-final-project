const jwt = require('jsonwebtoken')

const KEY= 'wn8723yhufbvjeni23>"{+:983u9io19:">0jei(*&^%$dwnefi2981ijdw'

module.exports = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, KEY);
        req.user = verified;
        req.userId = verified._id;
        req.userName = verified.username;
         next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
}





