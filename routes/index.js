var express = require('express');
var router = express.Router();
const verify = require('./verifyToken');
/* GET home page. */
router.get('/index', function(req, res, next) {
  response = verify.check(req);
  if (response.status) {
    console.log(response.name)
    res.render('index', { title: 'Index Page', filename: "unlocked" });
  } else {
    res.render('index', { title: 'Index Page', filename: "locked" });
  }
});

router.get('/', function(req, res, next) {
  res.redirect('/index');
});

router.get('/browse', verify.auth, function(req, res, next) {
  let name = req.userName;
  res.render('browse', {});
})


router.get('/play', function(req, res, next) {
  res.render('play', {});
})

router.get('/chat', function(req, res, next) {
  res.render('chat', {});

})
router.get('/learn', function(req, res, next) {
  res.render('learn', {});
})

router.get('/room', function(req, res, next) {
  res.render('room', {});
})
module.exports = router;
