var express = require('express');
var router = express.Router();
const verify = require('./verifyToken');
/* GET home page. */
router.get('/index', function(req, res, next) {
  
  res.render('index', { title: 'Index Page' });
});

router.get('/', function(req, res, next) {
  res.redirect('/index');
});

router.get('/browse', verify, function(req, res, next) {
  console.log("user" + req.userName)
  res.render('browse', {});
})


module.exports = router;
