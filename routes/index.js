var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Index Page' });
});

router.get('/', function(req, res, next) {
  res.redirect('/index');
});

router.get('/browse', function(req, res, next) {
  res.render('browse', {});
})

router.get('/', function(req, res, next) {
  res.redirect('/browse');
});

module.exports = router;
