var express = require('express');
var router = express.Router();

var model = require ('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('log-in', {});
})

router.get('/new', function(req, res, next) {
  res.render('sign-in', {});
})

router.get('/browse', function(req, res, next) {
  res.render('browse', {});
})

module.exports = router;
