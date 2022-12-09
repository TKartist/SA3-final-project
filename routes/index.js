var express = require('express');
var router = express.Router();
const verify = require('./verifyToken');
/* GET home page. */
router.get('/index', function(req, res, next) {
  if (verify.check(req)) {
    res.render('index', { title: 'Index Page', filename: "unlocked" });
  } else {
    res.render('index', { title: 'Index Page', filename: "locked" });
  }
});

router.get('/', function(req, res, next) {
  res.redirect('/index');
});

router.get('/browse', verify.auth, function(req, res, next) {
  console.log("user" + req.userName)
  res.render('browse', {});
})


router.get('/play', function(req, res, next) {
  res.render('play', {});
})
module.exports = router;
